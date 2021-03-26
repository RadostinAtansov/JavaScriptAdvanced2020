function solveClasses() {

    class Developer {
        constructor(firstName, lastname) {
            this.firstName = firstName;
            this.lastName = lastname;
            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }

        addTask(id, taskName, priority) {

            let task = { id, taskName, priority };
            if (task.priority == 'high') {
                this.tasks.unshift(task);
            } else {
                this.tasks.push(task);
            }

            return `Task id ${task.id}, with ${task.priority} priority, has been added.`;

        }

        doTask() {
            let result = "";
            if (this.tasks.length == 0) {
                result = `${firstEl.firstName}, you have finished all your tasks. You can rest now.`;
            } else {
                let firstEl = this.tasks.shift();
                result = `${firstEl.firstName}`;
            }
            return result;
        }

        getSalary() {
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`;
        }

        reviewTasks() {
            let out = '';
            out += `Tasks, that need to be completed:\n`;
            this.tasks.forEach(i => out += `${i.id}: ${i.taskName} - ${i.priority}\n`)
            return out.trim();
        }

    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName, experience)
            this.baseSalary = 1000 + bonus;
            this.tasks = [];
        }

        learn(years) {
            this.experience += years;
        }
    }

    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName, bonus, experience)
            this.tasks = [];
            this.experience += 5;
        }

        changeTaskPriority(taskId) {
            if (taskId == "high") {
                for (let i = 0; i < this.tasks.length; i++) {
                    if (i.priority == "high") {
                        i.priority == "low";
                        let firstBecomeLast = this.tasks.splice(i, 1);
                        this.task.push(firstBecomeLast);
                    }

                }
            } else { 
                for (let i = 0; i < this.tasks.length; i++) {
                    if (i.priority == "low") {
                        i.priority == "high";
                        let lastBecomeFirst = this.tasks.splice(i, 1);
                        this.task.unshift(lastBecomeFirst);
                    }

                }
            }
            return taskId;
        }

    }


    return {
        Developer,
        Junior,
        Senior
    }
}


let classes = solveClasses();
const developer = new classes.Developer("George", "Joestar");
console.log(developer.addTask(1, "Inspect bug", "low"));
console.log(developer.addTask(2, "Update repository", "high"));
console.log(developer.reviewTasks());
console.log(developer.getSalary());

const junior = new classes.Junior("Jonathan", "Joestar", 200, 2);
console.log(junior.getSalary());
// ----------------------------------------------------------------------------
const senior = new classes.Senior("Joseph", "Joestar", 200, 2);
senior.addTask(1, "Create functionality", "low");
senior.addTask(2, "Update functionality", "high");
console.log(senior.changeTaskPriority(1)["priority"]);

