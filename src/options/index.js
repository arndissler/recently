import { translate } from '../modules/i18n.mjs.js';

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

    Array.from(document.querySelectorAll('button[data-url]')).forEach(btn =>
        btn.addEventListener('click', () =>
            messenger.windows.openDefaultBrowser(btn.dataset['url'])
        )
    );

    const apply = document.getElementById('recently_apply');
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

    translate(document);
};

document.addEventListener('DOMContentLoaded', onLoad, { once: true });
