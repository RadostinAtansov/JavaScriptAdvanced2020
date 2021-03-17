function solve() {

    let inputs = document.querySelectorAll('input');

    let movieOnScreenAdd = document.querySelector('#movies > ul');
    let moveMovieToArchive = document.querySelector('#archive > ul');
    let clearAll = document.querySelector('#archive > button');



    const onScreen = document.querySelector('#container > button');

    onScreen.addEventListener('click', e => {
        e.preventDefault();
        let name = inputs.item(0).value;
        let hall = inputs.item(1).value;
        let ticketPrice = inputs.item(2).value;


        if (name.length == 0 || hall.length == 0 || ticketPrice.length == 0) {
            return;
        }
        if (!Number(ticketPrice)) {
            return;
        }

        console.log(name);
        console.log(hall);
        console.log(ticketPrice);

        let price = Number(ticketPrice).toFixed(2);

        let btnDelete = el('button', 'Delete');
        let btnArchive = el('button', 'Archive');
        let hallPlace = el('strong', `Hall: ${hall}`);
        let input = el('input', '', { placeholder: 'Tickets Sold' });

        let div = el('div', [
            el('strong', `${price}`),
            input,
            btnArchive
        ]);


        let addedMovie = el('li', [
            el('span', name),
            hallPlace,
            div
        ]);

        movieOnScreenAdd.appendChild(addedMovie);
        inputs.item(0).value = '';
        inputs.item(1).value = '';
        inputs.item(2).value = '';

        btnArchive.addEventListener('click', archiveMovie);

        function archiveMovie(e) {


            let ticketsSold = input.value;
            if (!Number(input.value)) {
                return;
            }
            let result = Number(ticketPrice * ticketsSold).toFixed(2);
            console.log(result);

            let totalAmounth = el('strong', `Total amount: ${result}`)
            moveMovieToArchive.appendChild(addedMovie);
            hallPlace.remove();
            div.remove();
            addedMovie.appendChild(totalAmounth);
            addedMovie.appendChild(btnDelete);

            btnDelete.addEventListener('click', deleteMovie);

            function deleteMovie(e) {
                addedMovie.remove();
            };
        };

    });

    clearAll.addEventListener('click', clear);

    function clear(e) {

        // var childNodes = document.querySelectorAll('#archive > ul > li');
        // childNodes.forEach(element => {
        //     element.remove();
        // });
        moveMovieToArchive.innerHTML = '';
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