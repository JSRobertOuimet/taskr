function Task(id, name, dueDate, priority) {
  this.id = id;
  this.name = name;
  this.dueDate = dueDate;
  this.priority = priority;
  this.done = false;
  this.opacity = '1';
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

Store.prototype.updateTasks = function(tasks) {
  return localStorage.setItem('tasks', JSON.stringify(tasks));
};

Store.prototype.addTask = function(task) {
  const store = new Store();
  const tasks = store.getTasks();

  tasks.push(task);
  store.updateTasks(tasks);
};

// Refactor to toggle method!
Store.prototype.checkmarkTask = function(id) {
  const store = new Store();
  const tasks = store.getTasks();

  tasks.forEach(function(task) {
    if(task.id === id) {
      task.done = true;
      task.opacity = '0.2';
    }
  });

  store.updateTasks(tasks);
};

Store.prototype.undoTask = function(id) {
  const store = new Store();
  const tasks = store.getTasks();

  tasks.forEach(function(task) {
    if(task.id === id) {
      task.done = false;
      task.opacity = '1';
    }
  });

  store.updateTasks(tasks);
};

Store.prototype.deleteTask = function(id) {
  const store = new Store();
  const tasks = store.getTasks();

  tasks.forEach(function(task, index) {
    if(task.id === id) {
      tasks.splice(index, 1);
    }
  });

  store.updateTasks(tasks);
};

// UI Methods
function UI() {}

UI.prototype.displayTasks = function() {
  const store = new Store();
  const ui = new UI();

  const tasks = store.getTasks();

  tasks.forEach(function(task) {
    ui.addTask(task, task.opacity);
  });
};

UI.prototype.addTask = function(task, opacity) {
  const taskList = document.querySelector('.list-group.list-group-flush');
  const newTask = document.createElement('li');

  let stateIcon;

  newTask.className = 'list-group-item';
  newTask.style.opacity = opacity;

  stateIcon = (task.done === false) ?
    `<i class="fas fa-check mr-3 text-success"></i>` :
    `<i class="fa fa-undo mr-3"></i>`;

  newTask.innerHTML = `
    <span style="display: none">${task.id}</span>
    <span>${task.name} <small class="text-muted ml-3">${task.dueDate}</small></span>
    <span class="float-right">
      ${stateIcon}
      <i class="far fa-edit mr-3"></i>
      <i class="far fa-trash-alt text-danger"></i>
    </span>`;

  taskList.appendChild(newTask);
};

UI.prototype.checkmarkTask = function(target) {
  const liElem = target.parentElement.parentElement;

  target.className = 'fa fa-undo mr-3';
  liElem.style.opacity = '0.2';
};

UI.prototype.undoTask = function(target) {
  const liElem = target.parentElement.parentElement;

  target.className = 'fa fa-check mr-3 text-success';
  liElem.style.opacity = '1';
};

UI.prototype.editTask = function(target) {
  console.log(target);
};

UI.prototype.removeTask = function(target) {
  const liElem = target.parentElement.parentElement;

  liElem.remove();
};

// Add task
document.getElementById('add-task').addEventListener('submit', function() {
  const store = new Store();
  const ui = new UI();

  const [taskName, dueDate, priority] = [
    document.getElementById('task-name').value,
    document.getElementById('task-due-date').value,
    document.getElementById('task-priority').value
  ];

  const task = new Task(store.genId(), taskName, dueDate, priority);

  store.addTask(task);
  ui.addTask(task, task.opacity);
});

// Checkmark, edit or delete task
document.getElementById('task-list').addEventListener('click', function(e) {
  const store = new Store();
  const ui = new UI();

  const [done, undo, edit, del, id] = [
    e.target.classList.contains('fa-check'),
    e.target.classList.contains('fa-undo'),
    e.target.classList.contains('fa-edit'),
    e.target.classList.contains('fa-trash-alt'),
    e.target.parentElement.previousElementSibling.previousElementSibling.textContent
  ];

  if(done) {
    ui.checkmarkTask(e.target);
    store.checkmarkTask(id);
  }
  if(undo) {
    ui.undoTask(e.target);
    store.undoTask(id);
  }
  if(edit) {
    ui.editTask(e.target);
  }
  if(del) {
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