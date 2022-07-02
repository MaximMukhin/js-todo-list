const btnAddTask = document.querySelector('.btn-add-task');
const taskInput = document.querySelector('.input-task');
const taskRender = document.querySelector('.task-render');
const noTask = document.querySelector('.no-task');

let tasks // массив задач
// получаю массив, если локальное хранение не пустое иначе
// получаю пустой массив
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemEl = [];

// конструктор задачи
function Task(description) {
  this.description = description;
  this.completed = false;
}

// шаблон карточки задачи
const createHtmlTamplate = (task, index) => {
  return `
  <div class="todo-item ${task.completed ? 'checked' : ''}">
  <div class="description">${task.description}</div>
  <div class="buttons">
    <input 
      onclick="completeTask(${index})" 
      class="btn-complete" 
      type="checkbox" ${task.completed ? 'checked' : ''}
    >
    <button onclick="deleteTask(${index})" class="btn-delete">Удалить</button>
  </div>
</div>
  `
}

// перенос готовых вниз списка
const filterTasks = () => {
  const activeTask = tasks.length && tasks.filter((item) => item.completed === false)
  const completedTask = tasks.length && tasks.filter((item) => item.completed === true)
  tasks = [...activeTask, ...completedTask]
}

// проверка есть ли задачи
const noTaskList = () => {
  if (tasks.length === 0) {
    console.log('first')
    noTask.innerHTML = 'Список задач пуст'
  } else {
    noTask.innerHTML = '';
  }
}
noTaskList();

// наполняю список задач
const htmlRenderList = () => {
  taskRender.innerHTML = '';
  if (tasks.length > 0) {
    filterTasks();
    noTaskList();
    tasks.forEach((item, index) => {
      taskRender.innerHTML += createHtmlTamplate(item, index);
    });
    todoItemEl = document.querySelectorAll('.todo-item');
  }
}
htmlRenderList()

// строка в локальное хранение
const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// чекбокс true or false
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

// добавляем новую задачу
btnAddTask.addEventListener('click', () => {
  if (taskInput.value !== '') {
    tasks.push(new Task(taskInput.value));
    updateLocalStorage();
    htmlRenderList();
    noTaskList();
    taskInput.value = '';
  } else {
    alert('Введите задачу');
  }

});

// удаление задачи
const deleteTask = (index) => {
  todoItemEl[index].classList.add('delete-anim')
  setTimeout(() => {
    tasks.splice(index, 1)
    updateLocalStorage();
    htmlRenderList();
    noTaskList();
  },1000)
}





