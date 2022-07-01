const btnAddTask = document.querySelector('.btn-add-task');
const taskInput = document.querySelector('.input-task');
const taskRender = document.querySelector('.task-render');

let tasks
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemEl = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createHtmlTamplate = (task, index) => {
  return `
  <div class="todo-item ${task.completed ? 'checked' : ''}">
  <div class="description">${task.description}</div>
  <div class="buttons">
    <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
    <button class="btn-delete">Удалить</button>
  </div>
</div>
  `
}

const htmlRenderList = () => {
  taskRender.innerHTML = '';
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      taskRender.innerHTML += createHtmlTamplate(item, index);
    });
    todoItemEl = document.querySelectorAll('.todo-item')
  }
}
htmlRenderList()
console.log(todoItemEl)

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed
  if (tasks[index].completed) {
    todoItemEl[index].classList.add('checked');
  } else {
    todoItemEl[index].classList.remove('checked');    
  }
  updateLocalStorage();
  htmlRenderList();
}

btnAddTask.addEventListener('click', () => {
  tasks.push(new Task(taskInput.value));
  updateLocalStorage();
  htmlRenderList();
  taskInput.value = '';
  console.log('btnAddTask', tasks);
});



