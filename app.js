// Кнопка Добавить
document.querySelector('.btn-add-task')
  .addEventListener('click', loadTextTask)

// Функция забирает текс задачи
function loadTextTask() {

  let loadText = document.querySelector('.input-task').value

  if (loadText !== '') {
    arrTask.push(loadText)
    console.log('arrTask', arrTask)
  } else {
    console.log('пустая строка')
  }
  document.getElementById('task').value = '';
  taskRender()
  noTask()
}

// Масив задачи
const arrTask = [
  'Купить корм кошке',
  'Сходить в магазин',
  'Покататься на велике',
];

// Функция рендера списка задач
function taskRender() {

  let out = [];

  for (key in arrTask) {
    out += `<div class="list-task">
    <div class="text-task">${arrTask[key]}</div>
    <button class="btn-delete-task">Удалить</button>
    </div>`
  }
  document.getElementById('task-render').innerHTML = out;
}
taskRender()
// Кнопка удаления
document.querySelector('.btn-delete-task')
  .addEventListener('click', deleteTask)

// Функция удаления задачи
function deleteTask() {
  arrTask.splice(0, 1)
  console.log('deleteTask')
  console.log('deleteTask', arrTask)
  taskRender()
}

// Условие есть задачи или нет
function noTask() {
  console.log('no-task')
  if (arrTask.length === 0) {
    let text = 'Задачи не найдены!'
    document.getElementById('no-task').innerHTML = text;
  }
}
