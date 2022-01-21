// @ts-check
/// <reference types="../../.typings/browser" />

let state = {
    messages: [],
    __histogram: {}
};

/**
 * Extracts the email address of an email author
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
    let pageCount = 0;
    do {
        result.push(...queryResult.messages);
        if (queryResult.id !== null) {
            queryResult = await messenger.messages.continueList(queryResult.id);
            pageCount++;
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
 */
const createHistgram = messageHeaders => {
    const result = messageHeaders.reduce((acc, messageHdr) => {
        const { author } = messageHdr;
        const authorAddress = findMailAddress(author);

        if (!authorAddress) {
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

const setState = async () => {
    state.messages = await getMessagesFromLastXDays(140);
    state.__histogram = createHistgram(state.messages);
};

messenger.runtime.onMessage.addListener(async message => {
    const { action } = message;
    let result = {};
    switch (action) {
        case 'get:histogram':
            result = { payload: { histogram: state.__histogram } };
            break;
    }

    return result;
});

setTimeout(() => setState(), 2000);

messenger.messages.onNewMailReceived.addListener(() =>
    setTimeout(() => setState(), 5000)
);
