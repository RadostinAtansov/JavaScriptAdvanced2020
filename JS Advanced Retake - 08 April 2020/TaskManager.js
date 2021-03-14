function solve() {

    let task = document.querySelector('#task');
    let description = document.querySelector('#description');
    let date = document.querySelector('#date');

    document.querySelector('#add').addEventListener('click', addTask);
    let orange = document.querySelectorAll('section').item(1).querySelectorAll('div').item(1);
    let yellow = document.querySelectorAll('section').item(2).querySelectorAll('div').item(1);
    let green = document.querySelectorAll('section').item(3).querySelectorAll('div').item(1);


    function addTask(e) {
        e.preventDefault();
        console.log('1');

        let tasks = task.value;
        let descriptions = description.value;
        let dates = date.value;

        if (tasks.length == 0 || descriptions.length == 0 || dates.length == 0) {
            return;
        }

        let start = el('button', 'Start', 'green');
        let deleteE = el('button', 'Delete', 'red');
        let finish = el('button', 'Finish', 'orange');

        let h3 = el('h3', `${tasks}`)
        let p1 = el('p', `Description: ${descriptions}`)
        let p2 = el('p', `Due Date: ${dates}`)
        let div = el('div', '', 'flex');
        let article = el('article');

        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);

        div.appendChild(start);
        div.appendChild(deleteE);

        article.appendChild(div);


        orange.appendChild(article);

        task.value = '';
        description.value = '';
        date.value = '';

        start.addEventListener('click', btnStartClick);
        deleteE.addEventListener('click', btnDeleteClick);
        finish.addEventListener('click', btnFinishClick);

        function btnStartClick(e) {
            yellow.appendChild(article);
            div.removeChild(start);
            div.appendChild(finish);
        }

        function btnDeleteClick(e) {
            article.remove();
        }

        function btnFinishClick(e) {
            green.appendChild(article);
            div.remove();
        }

    }



    function el(type, content, className) {
        let result = document.createElement(type);

        result.innerText = content;

        if (className) {
            result.classList.add(className);
        }

        return result;
    }

}