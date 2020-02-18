function newTask(event) {
    event.preventDefault();

    let taskHeading = document.querySelector('#taskHeading');
    let taskHeadingValue = taskHeading.value;

    if (taskHeadingValue !== '') {

        let taskDesc = document.querySelector('#taskDesc');
        let taskDescValue = taskDesc.value;

        const task = {
            'taskHeading': taskHeadingValue,
            'taskDesc': taskDescValue,
            'closed': 0
        }

        let taskJSON = JSON.stringify(task);

        saveTask(task);

        // reset
        taskHeading.value = '';
        taskDesc.value = '';
    } else {
        taskHeading.classList.add('error');

        setTimeout(() => taskHeading.classList.remove('error'), 2500);
    }
}

function saveTask(task) {

    let tasks = getAllTasks();

    let currTaskHeading = task.taskHeading;

    let tasksHeading = tasks.map((elem) => elem.taskHeading);

    if (tasksHeading.includes(currTaskHeading) === false) {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskToContainer(task);

}

function addTaskToContainer(task) {
    let container = document.querySelector('#container');

    if (task.closed === 0) {
        container.innerHTML += `
			<div class="task mt-2">
				<div class="task__heading"><p onclick="closeTask('` + task.taskHeading + `')">` + task.taskHeading + `</p><button type="button" class="btn-close" onclick="removeTask('` + task.taskHeading + `')"></button></div>
				<div class="task__desc mt-2"><p>` + task.taskDesc + `</p>
					<button type="button" class="btn-edit" onclick="editTask('` + task.taskHeading + `')">
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
					</button>
				</div>
			</div>
		`;
    } else {
        container.innerHTML += `
			<div class="task closed mt-2">
				<div class="task__heading"><p onclick="closeTask('` + task.taskHeading + `')">` + task.taskHeading + `</p><button type="button" class="btn-close" onclick="removeTask('` + task.taskHeading + `')"></button></div>
				<div class="task__desc mt-2"><p>` + task.taskDesc + `</p>
					<button type="button" class="btn-edit" onclick="editTask('` + task.taskHeading + `')">
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
					</button>
				</div>
			</div>
		`;
    }
}


function getAllTasks() {
    let tasks = [];
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    return tasks;
}

function initTasks() {
    let container = document.querySelector('#container');
    container.innerHTML = '';

    let tasks = getAllTasks();

    for (let i = 0; i < tasks.length; i++) {
        addTaskToContainer(tasks[i]);
    }
}

function removeTask(taskHeading) {
    let tasks = getAllTasks();

    for (let i = 0; i < tasks.length; i++) {
        if (taskHeading === tasks[i].taskHeading) {
            tasks.splice(i, i + 1);

            localStorage.setItem('tasks', JSON.stringify(tasks));

            initTasks();
        }
    }
}

function closeTask(taskHeading) {
    let tasks = getAllTasks();

    for (let i = 0; i < tasks.length; i++) {
        if (taskHeading === tasks[i].taskHeading) {
            tasks[i].closed = 1;

            localStorage.setItem('tasks', JSON.stringify(tasks));

            initTasks();
        }
    }
}

function editTask(taskHeading) {
    let tasks = getAllTasks();

    for (let i = 0; i < tasks.length; i++) {
        if (taskHeading === tasks[i].taskHeading) {
            let taskDesc = tasks[i].taskDesc;

            document.querySelector('#taskHeading').value = taskHeading;
            document.querySelector('#taskDesc').value = taskDesc;
        }
    }
    removeTask(taskHeading);
}

initTasks()