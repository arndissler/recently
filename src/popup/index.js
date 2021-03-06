import { translate } from '../modules/i18n.mjs.js';

const renderItem = (parent, item) => {
    const { names, count, author } = item;
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `mailto:${author}`;

    const text = document.createTextNode(names.pop());
    link.appendChild(text);

    const wrapper = document.createElement('div');
    wrapper.className = 'recently-list__item-wrapper';
    wrapper.appendChild(link);

    wrapper.addEventListener('click', e => {
        link.dispatchEvent(new MouseEvent('click'));
    });

    li.appendChild(wrapper);

    parent.appendChild(li);
};

/**
 *
 * @param {import("../scripts/background").RecentlyHistorgramEntry[]} histogram
 */
const renderHistogram = histogram => {
    const element = document.querySelector('.recently-list');
    if (histogram.length) {
        histogram
            .sort((a, b) => a.count - b.count)
            .map(item => renderItem(element, item));
    } else {
        renderItem(element, {
            count: 0,
            names: [messenger.i18n.getMessage('popupNoMessagesFound')],
            author: ''
        });
    }
};

const renderText = options => {
    const wrapper = document.querySelector('.recently-popup__text-wrapper');
    const span = document.createElement('span');
    const localizedText = browser.i18n.getMessage(
        'popupText',
        options.lookback
    );
    const text = document.createTextNode(localizedText);
    span.appendChild(text);
    wrapper.appendChild(span);
};

const onLoad = async () => {
    const data = await messenger.runtime.sendMessage({
        action: 'get:histogram'
    });

    if (!data) {
        console.warn('no data found');
        return;
    }

    const {
        payload: { histogram = [], options }
    } = data;

    translate(document);

    renderHistogram(histogram);
    renderText(options);
};

document.addEventListener('DOMContentLoaded', onLoad, { once: true });
