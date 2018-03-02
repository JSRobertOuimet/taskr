function Task(id, name, dueDate, recurrence, priority) {
  this.id = id;
  this.name = name;
  this.dueDate = dueDate;
  this.recurrence = recurrence;
  this.priority = priority;

  this.done = false;
  this.opacity = '1';
}

// Add task
document.getElementById('add-task').addEventListener('submit', addTask);

function addTask() {
  const store = new Store();
  const ui = new UI();

  const [
    taskName,
    dueDate,
    recurrence,
    priority
  ] = [
    document.getElementById('task-name').value,
    document.getElementById('task-due-date').value,
    document.getElementById('task-recurrence').value,
    document.getElementById('task-priority').value
  ];

  const task = new Task(store.genId(), taskName, dueDate, recurrence, priority);

  store.addTask(task);
  ui.addTask(task);
}

document.getElementById('edit-task').addEventListener('submit', editTask);

function editTask(e) {
  const [
    taskName,
    dueDate,
    recurrence,
    priority,
  ] = [
    document.getElementById('e-task-name').value,
    document.getElementById('e-task-due-date').value,
    document.getElementById('e-task-recurrence').value,
    document.getElementById('e-task-priority').value,
  ];

  console.log(taskName, dueDate, recurrence, priority);

  e.preventDefault();
}

// Actions
document.getElementById('task-list').addEventListener('click', function(e) {
  const store = new Store();
  const ui = new UI();

  const [
    done,
    undo,
    edit,
    del,

    id
  ] = [
    e.target.classList.contains('fa-check'),
    e.target.classList.contains('fa-undo'),
    e.target.classList.contains('fa-edit'),
    e.target.classList.contains('fa-trash-alt'),

    e.target.parentElement.previousElementSibling.previousElementSibling.textContent
  ];

  // Switch statement?
  if(done) {
    ui.checkmarkTask(e.target);
    store.checkmarkTask(id);
  }
  if(undo) {
    ui.undoTask(e.target);
    store.undoTask(id);
  }
  if(edit) {
    ui.getTaskValues(id);
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