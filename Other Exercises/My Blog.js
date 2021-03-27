function solve() {


    let sections = document.querySelectorAll('section');

    let sectionArticle = sections.item(1);
    let sectionArchiveArticle = sections.item(3).querySelector('ul');

    const buttonCreate = document.querySelector('form > button');

    buttonCreate.addEventListener('click', createArticle);

    function createArticle(e) {
        e.preventDefault();
        let author = document.getElementById('creator').value;
        let title = document.getElementById('title').value;
        let category = document.getElementById('category').value;
        let content = document.getElementById('content').value;

        let pToRemoveAfter1 = el('p', [
            'Category: ',
            el('strong', category)
        ]);

        let pToRemoveAfter2 = el('p', [
            'Creator: ',
            el('strong', author)
        ]);

        let pToRemoveAfter3 = el('p', content);

        let btnDelete = el('button', 'Delete', { className: "btn delete" });
        let btnArchive = el('button', 'Archive', { className: "btn archive" });
        let div = el('div', [
            btnDelete,
            btnArchive
        ], { className: 'buttons' });

        let createOneArticle = el('article', [
            el('h1', title),
            pToRemoveAfter1,
            pToRemoveAfter2,
            pToRemoveAfter3,
            div
        ]);

        sectionArticle.appendChild(createOneArticle);

        document.getElementById('creator').value = '';
        document.getElementById('title').value = '';
        document.getElementById('category').value = '';
        document.getElementById('content').value = '';


        btnDelete.addEventListener('click', deleteArtcle);
        btnArchive.addEventListener('click', archiveArtcle);

        function deleteArtcle(e) {
            createOneArticle.remove();
        };

        function archiveArtcle(e) {

            createOneArticle.remove();
            let liTitle = el('li', title);
            sectionArchiveArticle.appendChild(liTitle);

            let sortLi = Array.from(sectionArchiveArticle.getElementsByTagName('li'))
                .sort((a, b) => (a.innerHTML).localeCompare(b.innerHTML));

            while (sectionArchiveArticle.firstChild) {
                sectionArchiveArticle.removeChild(sectionArchiveArticle.firstChild);
            };
            sortLi.forEach(li => {
                sectionArchiveArticle.appendChild(li);
            });


        };
    };

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