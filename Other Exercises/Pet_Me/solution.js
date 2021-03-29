function solve() {

    let inputs = document.querySelectorAll('input');
    let btnAdd = document.querySelector('#container > button');
    let sectionToAdded = document.querySelector('#adoption > ul');
    let sectionAdopted = document.querySelector('#adopted > ul');

    btnAdd.addEventListener('click', addBtn);

    function addBtn(e) {

        e.preventDefault();
        let name = inputs.item(0).value.trim();
        let age = inputs.item(1).value.trim();
        let kind = inputs.item(2).value.trim();
        let currentOwner = inputs.item(3).value;

        if (name.length == 0 || age.length == 0 || kind.length == 0 || currentOwner.length == 0) {

            return;
        }
        if (!Number(age)) {
            return;
        }

        inputs.item(0).value = '';
        inputs.item(1).value = '';
        inputs.item(2).value = '';
        inputs.item(3).value = '';



        let btnContact = el('button', 'Contact with owner');
        let currentOw = el('span', `Owner: ${currentOwner}`);

        let createPetAdoptOffer = el('li', [
            el('p', [
                el('strong', name), " is a ",
                el('strong', age), " year old ",
                el('strong', kind)
            ]),
            currentOw,
            btnContact

        ]);

        let inputName = el('input', '', { placeholder: 'Enter your names' });
        let btnYes = el('button', 'Yes! I take it!');

        let createDiv = el('div', [
            inputName,
            btnYes
        ]);

        sectionToAdded.appendChild(createPetAdoptOffer);

        btnContact.addEventListener('click', clickContact);

        function clickContact(e) {
            e.currentTarget.remove();
            createPetAdoptOffer.appendChild(createDiv);

        }

        btnYes.addEventListener('click', yesITakeIt);
        let checked = el('button', 'Checked');

        function yesITakeIt(e) {
            let inName = inputName.value;
            if (inName.length == 0) {
                return;
            }
            createDiv.remove();
            currentOw.innerText = `New Owner: ${inName}`;

            createPetAdoptOffer.appendChild(checked);
            sectionAdopted.appendChild(createPetAdoptOffer);
        }

        checked.addEventListener('click', removePetOffer);

        function removePetOffer(e) {
            let parent = e.currentTarget.parentElement;
            parent.remove();

        }


    }

    function el(type, content, attributes) {
        let result = document.createElement(type);

        if (attributes !== undefined) {
            Object.assign(result, attributes);
        }

        if (Array.isArray(content)) {
            content.forEach(append);
        } else {
            append(content);
        }

        function append(node) {
            if (typeof node === 'string' || typeof node === 'number') {
                node = document.createTextNode(node);
            }
            result.appendChild(node);
        }
        return result;
    }
}