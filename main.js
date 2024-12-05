const date = document.querySelector('#date');
const list = document.querySelector('#list');
const taskList = document.querySelector('#taskList');
const input = document.querySelector('#input');
const addButton = document.querySelector('#addButton');
const check = 'bi-check-square';
const crossedOut = 'crossedOut';
const uncheck = 'bi-square';

let LIST;
let id;

const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString('en-MX', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

function addTask(task, id, done, remove){
    if(remove){
        return
    };
    const made = done ? check : uncheck;
    const LINE = done ? crossedOut : '';
    const taskSection = `<li id="taskList">
                            <i id="${id}" data="done" class="bi ${made}"></i>
                            <p class="taskList text ${LINE}">${task}</p>
                            <i id="${id}" data="remove" class="bi bi-trash"></i>
                        </li>`
    list.insertAdjacentHTML("beforeend", taskSection); 
};

function taskCompleted(taskSection){
    taskSection.classList.toggle(check);
    taskSection.classList.toggle(uncheck);
    taskSection.parentNode.querySelector('.text').classList.toggle(crossedOut);
    LIST[taskCompleted.id].made = LIST[taskSection.id].made ? false : true;
};

function taskDeleted(taskSection){
    taskSection.parentNode.parentNode.removeChild(taskSection.parentNode);
    LIST[taskSection.id].remove = true;
};

addButton.addEventListener("click", () => {
    const task = input.value;
    if (task){
        addTask(task, id, false, false)
        LIST.push({
            name: task,
            id: id,
            done: false,
            remove: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});

list.addEventListener("click", function (event){
    const taskSection = event.target;
    const elementData = taskSection.attributes.data.value;
    if (elementData == "done"){
        taskCompleted(taskSection);
    } else if (elementData == "remove"){
        taskDeleted(taskSection);
    };
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else{
    LIST = [];
    id = 0;
};

function loadList(array){
    array.forEach(
        function (item){
            addTask(item.name, item.id, item.done, item.remove);
        }
    );
};