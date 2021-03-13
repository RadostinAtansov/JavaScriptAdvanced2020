function solution() {
    const [gifts, sent, discarded] = document.querySelectorAll('section ul');
    const input = document.querySelector('input');
    document.querySelector('button').addEventListener('click', addGift);

    function addGift() {
        const name = input.value;
        input.value = '';

        const element = el('li', name, 'gift');
        const sendBtn = el('button', 'Send', 'sendButton');
        const discardBtn = el('button', 'Discard', 'discardButton');
        element.appendChild(sendBtn);
        element.appendChild(discardBtn);

        sendBtn.addEventListener('click', () => sendGift(name, element));
        discardBtn.addEventListener('click', () => discardGift(name, element));

        gifts.appendChild(element);

        sortGifts();
    }

    function sendGift(name, gift) {

        gift.remove();
        const element = el('li', name, 'gift')
        sent.appendChild(element);
    }

    function discardGift(name, gift) {
        gift.remove();
        const element = el('li', name, 'gift');
        discarded.appendChild(element);
    }

    function sortGifts() {
        Array
            .from(gifts.children)
            .sort((a, b) => a.childNodes[0].textContent.localeCompare(b.childNodes[0].textContent))
            .forEach(g => gifts.appendChild(g));
    }

    function el(type, content, className) {
        const result = document.createElement(type);
        result.textContent = content;
        if (className) {
            result.className = className;
        }
        return result;
    }
}