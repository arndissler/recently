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

    li.appendChild(wrapper);

    parent.appendChild(li);
};

/**
 *
 * @param {[]} histogram
 */
const renderHistogram = histogram => {
    const element = document.querySelector('.recently-list');
    // while (element.hasChildNodes) {
    //     element.lastChild.remove();
    // }
    histogram
        .sort((a, b) => a.count - b.count)
        .map(item => renderItem(element, item));
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

    console.log('recently, records: ', histogram);

    renderHistogram(histogram);
    renderText(options);
};

document.addEventListener('DOMContentLoaded', onLoad, { once: true });
