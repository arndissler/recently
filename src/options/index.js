/**
 * @param {import("../scripts/background").RecentlyOptions} options
 */
const showOptions = options => {
    /**
     * @type {HTMLInputElement[]}
     */
    const prefElements = Array.from(
        document.querySelectorAll('[data-property]')
    );
    prefElements.forEach(prefElement => {
        const propertyName = prefElement.dataset['property'];
        prefElement.value = options[propertyName];
    });
};

const onLoad = async () => {
    const data = await messenger.runtime.sendMessage({
        action: 'get:options'
    });

    if (!data || !Object.keys(data).length) {
        console.warn('no data found');
        return;
    }

    const {
        payload: {
            /**
             * @type {import("../scripts/background").RecentlyOptions}
             */
            options
        }
    } = data;

    showOptions(options);

    const apply = document.querySelector('[type="submit"]');
    console.log(`apply?`, apply);
    apply.addEventListener('click', async () => {
        /**
         * @type {import("../scripts/background").RecentlyOptions}
         */
        const newOptions = { ...options };
        /**
         * @type {HTMLInputElement[]}
         */
        const prefElements = Array.from(
            document.querySelectorAll('[data-property]')
        );
        prefElements.forEach(prefElement => {
            const propertyName = prefElement.dataset['property'];
            newOptions[propertyName] = prefElement.value;
        });

        const success = await messenger.runtime.sendMessage({
            action: 'set:options',
            payload: { options: { ...newOptions } }
        });
    });

    /**
     * @type {HTMLElement[]}
     */
    const elements = Array.from(document.querySelectorAll('[data-i18n]'));
    elements.forEach(element => {
        console.log(`localizing ${element.dataset['i18n']}`);
        const text = messenger.i18n.getMessage(element.dataset['i18n']);
        element.insertBefore(document.createTextNode(text), element.firstChild);
    });
};

document.addEventListener('DOMContentLoaded', onLoad, { once: true });
