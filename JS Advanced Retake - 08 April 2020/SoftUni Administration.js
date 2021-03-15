function solve() {
    document.querySelector("form > div > button").addEventListener('click', getInfo);
    let inputEls = Array.from(document.querySelectorAll("form > div > input"));
    let selectEl = document.querySelector("div > select");
    let trainingModulesEl = document.querySelector(".modules");
    let modules = [];

    function getInfo(e) {
        e.preventDefault();
        let [lectureNameFiled, dateField] = inputEls;

        if (lectureNameFiled.value == "" || dateField.value == "") {
            return
        }

        if (selectEl.value == "Select module") {
            return
        }

        let headerH3El = document.createElement("h3");
        headerH3El.textContent = selectEl.value.toUpperCase() + "-MODULE";
        let divEl = document.createElement("div");
        divEl.setAttribute("class", 'module');
        divEl.appendChild(headerH3El);
        let ulEl = document.createElement("ul");
        let liEl = document.createElement("li");
        liEl.setAttribute("class", 'flex');
        let headerH4El = document.createElement("h4");
        let dateValue = convertDate(dateField.value);

        headerH4El.textContent = `${lectureNameFiled.value} - ${dateValue}`;
        let delBtn = document.createElement("button");
        delBtn.textContent = "Del";
        delBtn.setAttribute("class", "red");

        liEl.appendChild(headerH4El);
        liEl.appendChild(delBtn);

        if (modules.includes(selectEl.value) && modules.length > 0) {
            let trainingDivEls = Array.from(document.querySelectorAll(".module"));
            for (let curDivEl of trainingDivEls) {
                let h3El = curDivEl.firstElementChild;
                if (headerH3El.textContent == h3El.textContent) {
                    let curUlEl = curDivEl.lastElementChild;
                    curUlEl.appendChild(liEl);
                    let liElArr = Array.from(curUlEl.querySelectorAll("li"));
                    liElArr.sort((li1, li2) => {
                        let li1Date = getDate(li1)
                        li1Date = convertDateToInitialState(li1Date);
                        li1Date = new Date(li1Date);
                        let li2Date = getDate(li2)
                        li2Date = convertDateToInitialState(li2Date);
                        li2Date = new Date(li2Date);

                        return li1Date.getTime() - li2Date.getTime();
                    })
                    liElArr.forEach(el => curUlEl.appendChild(el))
                }
            }
        } else {
            ulEl.appendChild(liEl);
            divEl.appendChild(ulEl);
            trainingModulesEl.appendChild(divEl);
            modules.push(selectEl.value);
        }

        delBtn.addEventListener('click', deleteTraining);

        function deleteTraining(e) {
            let liToRemove = e.target.parentElement;
            if (!liToRemove.nextElementSibling && !liToRemove.previousElementSibling) {
                let training = liToRemove.parentElement.parentElement;
                training = training.remove();

            } else {
                liToRemove.remove();
            }
        }

        function convertDate(dateValue) {
            while (dateValue.includes("-")) {
                dateValue = dateValue.replace("-", "/");
            }
            dateValue = dateValue.replace("T", " - ");
            return dateValue;
        }

        function convertDateToInitialState(dateValue) {
            while (dateValue.includes("/")) {
                dateValue = dateValue.replace("/", "-");
            }
            dateValue = dateValue.replace(" - ", "T");
            return dateValue;
        }

        function getDate(liEl) {
            let index = liEl.querySelector("h4").textContent.indexOf("-") + 2;
            let dateAndTime = liEl.querySelector("h4").textContent.slice(index);
            return dateAndTime;
        }
    }
};