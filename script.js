function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

function addNote() {
    const noteInput = document.getElementById('new-note');
    const noteList = document.getElementById('note-items');

    if (noteInput.value.trim() !== '') {
        const newNote = document.createElement('li');
        newNote.textContent = noteInput.value;
        noteList.appendChild(newNote);
        noteInput.value = ''; // Clear input after adding note
    }
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-items');

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = taskInput.value;
        taskList.appendChild(newTask);
        taskInput.value = ''; // Clear input after adding task
    }
}

let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery-image');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
}

showImage(currentImageIndex);

let tasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        isDone: false
    };

    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, isDone: !task.isDone };
        }
        return task;
    });
    renderTasks();
}

function modifyTask(id) {
    const newTaskText = prompt('Edit your task:');
    if (newTaskText.trim() === '') return;

    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, text: newTaskText };
        }
        return task;
    });
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.isDone ? 'done' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTaskStatus(${task.id})">${task.isDone ? 'Undo' : 'Done'}</button>
                <button onclick="modifyTask(${task.id})">Modify</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

