// @ts-check
/// <reference types="../../.typings/browser" />

/**
 * @typedef {Object} RecentlyMessage
 * @property {string} action
 * @property {Object=} payload
 */

/**
 * @typedef {Object} RecentlyHistorgramEntry
 * @property {string[]} names
 * @property {string} author
 * @property {number} count
 */

/**
 * @typedef {Object} RecentlyOptions
 * @property {number} [lookback=14]
 */

/**
 * @typedef {Object} RecentlyState
 * @property {messenger.messages.MessageHeader[]} messages
 * @property {RecentlyOptions} options
 * @property {RecentlyHistorgramEntry[]} __histogram
 */

/** @type {RecentlyState} */
let state = {
    messages: [],
    options: {
        lookback: 14
    },
    __histogram: []
};

/**
 * Extracts the email address of an email author
 *
 * @param {string} author The author of an email message, might be an email address or in format Firstname Surname <email@example.com>
 * @returns {string|null} An email address if one can be found, `null` otherwise
 */
export const findMailAddress = author => {
    if (!author) {
        return null;
    }

    const tokenStartPos = author.indexOf('<');
    const tokenEndPos = author.indexOf('>');

    if (tokenStartPos > 0 && tokenStartPos < tokenEndPos) {
        const mayBeAddress = author.substring(tokenStartPos + 1, tokenEndPos);
        return mayBeAddress;
    }

    return author;
};

/**
 * Retrieve all message headers from within a given time range
 *
 * @param {number} numberOfDays Number of days to look back from current time
 * @returns {Promise<messenger.messages.MessageHeader[]>} All message headers from within the given time range
 */
const getMessagesFromLastXDays = async numberOfDays => {
    const correlationId = (Math.random() * 1000).toString(16);
    console.log(`Recently: getting messages… ${correlationId}`);
    const queryInfo = {
        fromDate: new Date(Date.now() - numberOfDays * 24 * 60 * 60 * 1000)
    };
    let queryResult = await messenger.messages.query(queryInfo);
    if (
        queryResult.id === null &&
        Array.isArray(queryResult.messages) &&
        queryResult.messages.length === 0
    ) {
        console.log(
            `Recently: getting messages… DONE ${correlationId}`,
            queryResult
        );
        return [];
    }

    let result = [];
    let continueIteration = true;
    do {
        result.push(...queryResult.messages);
        if (queryResult.id !== null) {
            queryResult = await messenger.messages.continueList(queryResult.id);
        } else {
            continueIteration = false;
        }
    } while (continueIteration);

    console.log(`Recently: getting messages… DONE ${correlationId}`);
    return result;
};

/**
 * Creates a histogram of all messages in the given list
 *
 * @param {messenger.messages.MessageHeader[]} messageHeaders
 * @returns {RecentlyHistorgramEntry[]} All histogram entires or an empty array
 */
const createHistogram = messageHeaders => {
    const result = messageHeaders.reduce((acc, messageHdr) => {
        const { author, junk } = messageHdr;
        const authorAddress = findMailAddress(author);

        // we don't have an author email address? → skip it
        if (!authorAddress) {
            return acc;
        }

        // mail is junk? → skip it
        if (junk) {
            return acc;
        }

        const normalizedAuthorAddress = authorAddress.toLocaleLowerCase();

        if (!acc.has(normalizedAuthorAddress)) {
            acc.set(normalizedAuthorAddress, {
                names: [author],
                author,
                count: 1
            });
        } else {
            const item = acc.get(normalizedAuthorAddress);
            acc.set(normalizedAuthorAddress, {
                author: item.author,
                names: Array.from(new Set(item.names).keys()),
                count: item.count + 1
            });
        }

        return acc;
    }, new Map());

    return Array.from(result.values());
};

/**
 * Refreshes the state by updating the message header information list
 */
const setState = async () => {
    state.messages = await getMessagesFromLastXDays(
        state.options.lookback || 14
    );
    state.__histogram = createHistogram(state.messages);
};

messenger.runtime.onMessage.addListener(async message => {
    /** @type {RecentlyMessage} */
    const { action, payload } = message;
    let result = {};
    switch (action) {
        case 'get:histogram':
            result = {
                payload: {
                    options: state.options,
                    histogram: state.__histogram
                }
            };
            break;
        case 'get:options':
            result = {
                payload: {
                    options: state.options
                }
            };
            break;
        case 'set:options':
            const { options = state.options } = payload;
            try {
                messenger.storage.local.set(options);
                state.options = options;
                setState();
            } catch (e) {
                // silence here
            }
            break;
    }

    return result;
});

const onLoad = async () => {
    console.log(`Recently started via onLoad`);
    setTimeout(async () => {
        try {
            /** @type { { [key in keyof RecentlyOptions]: string }} */
            const storagedOptions = await messenger.storage.local.get();
            console.log(`initialized options`, storagedOptions);

            state.options.lookback = Number.parseInt(
                String(storagedOptions.lookback || state.options.lookback),
                10
            );

            setState();
        } catch (e) {
            console.error(`Recently :: oh noes, there's an error`, e);
        }
    }, 2000);
};

browser.commands.onCommand.addListener(async command => {
    switch (command) {
        case 'open_list':
            await messenger.browserAction.openPopup();
            break;
    }
});

messenger.messages.onNewMailReceived.addListener(() =>
    setTimeout(() => setState(), 1000)
);

messenger.messages.onUpdated?.addListener(() => {
    setTimeout(() => setState(), 1000);
});

onLoad();
