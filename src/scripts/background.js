// @ts-check
/// <reference types="../../.typings/browser" />

/**
 * @typedef {Object} RecentlyHistorgramEntry
 * @property {string[]} names
 * @property {string} author
 * @property {number} count
 */

/**
 * @typedef RecentlyOptions
 * @type {Object}
 * @property {number} [lookback=14]
 */

/**
 * @typedef RecentlyState
 * @type {Object}
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
    const queryInfo = {
        fromDate: new Date(Date.now() - numberOfDays * 24 * 60 * 60 * 1000)
    };
    let queryResult = await messenger.messages.query(queryInfo);
    if (
        queryResult.id === null &&
        Array.isArray(queryResult.messages) &&
        queryResult.messages.length === 0
    ) {
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
    const { action } = message;
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
    }

    return result;
});

const onLoad = () => {
    setTimeout(() => {
        setState();
    }, 2000);
};

messenger.messages.onNewMailReceived.addListener(() =>
    setTimeout(() => setState(), 1000)
);

messenger.messages.onUpdated.addListener(() => {
    setTimeout(() => setState(), 1000);
});

document.addEventListener('DOMContentLoaded', onLoad, { once: true });
