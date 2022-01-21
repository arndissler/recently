const renderItem = (parent, item) => {
    const { names, count, author } = item;
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `mailto:${author}`;

    const text = document.createTextNode(names.pop());
    link.appendChild(text);
    li.appendChild(link);

    parent.appendChild(li);
};

/**
 *
 * @param {[]} histogram
 */
const renderHistogram = histogram => {
    const element = document.querySelector('.recently-popup--list-content');
    // while (element.hasChildNodes) {
    //     element.lastChild.remove();
    // }
    histogram
        .sort((a, b) => a.count - b.count)
        .map(item => renderItem(element, item));
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
        payload: { histogram = [] }
    } = data;

    renderHistogram(histogram);
};

document.addEventListener('DOMContentLoaded', onLoad, { once: true });
