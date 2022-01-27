export const translate = doc => {
    /**
     * @type {HTMLElement[]}
     */
    const elements = Array.from(doc.querySelectorAll('[data-i18n]'));
    elements.forEach(element => {
        const text = messenger.i18n.getMessage(element.dataset['i18n']);
        element.insertBefore(doc.createTextNode(text), element.firstChild);
    });
};
