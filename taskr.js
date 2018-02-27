function Task(name, dueDate, priority) {
  this.name = name;
  this.dueDate = dueDate;
  this.priority = priority;
}

function Store() {}

Store.prototype.getTasks = function() {
  let tasks;

  tasks = localStorage.getItem('tasks') === null ?
    tasks = [] :
    tasks = JSON.parse(localStorage.getItem('tasks'));

  return tasks;
};

Store.prototype.addTask = function(task) {
  const store = new Store();
  const tasks = store.getTasks();

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

Store.prototype.displayTasks = function() {
  const store = new Store();
  const ui = new UI();

  const tasks = store.getTasks();

  tasks.forEach(function(task) {
    ui.listNewTask(task);
  });
};

function UI() {}

UI.prototype.listNewTask = function(task) {
  const taskList = document.querySelector('.list-group.list-group-flush');
  const newTask = document.createElement('li');

  newTask.className = 'list-group-item';
  newTask.innerHTML = `
    ${task.name}
    <span class="pull-right">
      <i class="far fa-edit mr-3"></i>
      <i class="far fa-trash-alt text-danger"></i>
    </span>
  `;

  taskList.appendChild(newTask);
};

document.getElementById('add-task').addEventListener('submit', function(e) {
  const [taskName, dueDate, priority] = [
    document.getElementById('task-name').value,
    document.getElementById('task-due-date').value,
    document.getElementById('task-priority').value
  ];

  const task = new Task(taskName, dueDate, priority);
  const store = new Store();
  const ui = new UI();

  store.addTask(task);
  ui.listNewTask(task);

  // e.preventDefault();
});

// Initialization
(function() {
  const store = new Store();

  document.addEventListener('DOMContentLoaded', store.displayTasks);

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