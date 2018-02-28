function Task(id, name, dueDate, priority, done) {
  this.id = id;
  this.name = name;
  this.dueDate = dueDate;
  this.priority = priority;
  this.done = false;
}

// Local Storage Methods
function Store() {}

Store.prototype.getTasks = function() {
  let tasks;

  tasks = localStorage.getItem('tasks') === null ?
    tasks = [] :
    tasks = JSON.parse(localStorage.getItem('tasks'));

  return tasks;
};

Store.prototype.genId = function() {
  let id;
  const digitsArr = [];
  let i = 0;

  while(i < 40) {
    let digit;

    digit = getRandomDigit(0, 9);
    digitsArr.push(digit);
    i++;
  }

  function getRandomDigit(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  id = digitsArr.join('');

  return id;
};

Store.prototype.addTask = function(task) {
  const store = new Store();
  const tasks = store.getTasks();

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

Store.prototype.deleteTask = function(id) {
  const store = new Store();
  const tasks = store.getTasks();

  tasks.forEach(function(task) {
    if(task.id === id) {
      localStorage.removeItem('tasks', JSON.stringify(task));
    }
  });
};

// UI Methods
function UI() {}

UI.prototype.displayTasks = function() {
  const store = new Store();
  const ui = new UI();

  const tasks = store.getTasks();

  tasks.forEach(function(task) {
    ui.listNewTask(task);
  });
};

UI.prototype.listNewTask = function(task) {
  const taskList = document.querySelector('.list-group.list-group-flush');
  const newTask = document.createElement('li');

  newTask.className = 'list-group-item';
  newTask.innerHTML = `
    <span style="display: none">${task.id}</span>
    <span>${task.name} <small class="text-muted ml-3">${task.dueDate}</small></span>
    <span class="float-right">
      <i class="far fa-edit mr-3"></i>
      <i class="far fa-trash-alt text-danger"></i>
    </span>`;

  taskList.appendChild(newTask);
};

UI.prototype.editTask = function(target) {
  console.log(target);
};

UI.prototype.removeTask = function(target) {
  const liElem = target.parentElement.parentElement;

  liElem.remove();
};

// Add task
document.getElementById('add-task').addEventListener('submit', function(e) {
  const store = new Store();
  const ui = new UI();

  const [taskName, dueDate, priority] = [
    document.getElementById('task-name').value,
    document.getElementById('task-due-date').value,
    document.getElementById('task-priority').value
  ];

  const task = new Task(store.genId(), taskName, dueDate, priority);

  store.addTask(task);
  ui.listNewTask(task);

  // e.preventDefault();
});

// Edit || delete
document.getElementById('task-list').addEventListener('click', function(e) {
  const store = new Store();
  const ui = new UI();

  if(e.target.classList.contains('fa-edit')) {
    ui.editTask(e.target);
  }
  else {
    const id = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    ui.removeTask(e.target);
    store.deleteTask(id);
  }
});

// Initialization
(function() {
  const ui = new UI();

  document.addEventListener('DOMContentLoaded', ui.displayTasks);

  window.addEventListener('load', function() {
    let form = document.querySelectorAll('.needs-validation');

    let validation = Array.prototype.filter.call(form, function(form) {
      form.addEventListener('submit', function(e) {
        if(form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();