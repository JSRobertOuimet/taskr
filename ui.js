function UI() {}

UI.prototype.displayTasks = function() {
  const store = new Store();
  const ui = new UI();

  const tasks = store.getTasks();

  tasks.forEach(function(task) {
    ui.displayTask(task);
  });
};

UI.prototype.displayTask = function(task) {
  const time = new Time();
  const taskList = document.querySelector('.list-group.list-group-flush');
  const newTask = document.createElement('li');

  let doneOrNotIcon,
      priority;

  newTask.className = 'list-group-item';

  if(task.dueDate === time.getToday()) {
    newTask.className += ' font-weight-bold text-danger';
  }

  newTask.style.opacity = (task.done === false) ?
    newTask.style.opacity = '1' :
    newTask.style.opacity = '0.2';

  // if(task.priority === 'None') {
  //   priority = '';
  // }
  // if(task.priority === 'Low') {
  //   priority = '!';
  // }
  // if(task.priority === 'Medium') {
  //   priority = '!!';
  // }
  // if(task.priority === 'High') {
  //   priority = '!!!';
  // }

  // switch(task.priority) {
  //   case 'None':
  //     priority = '';
  //     break;
  //   case 'Low':
  //     priority = '!';
  //     break;
  //   case 'Medium':
  //     priority = '!!';
  //     break;
  //   case 'High':
  //     priority = '!!!';
  //     break;
  // }

  doneOrNotIcon = (task.done === false) ?
    `<i class="fas fa-check mr-3 text-success"></i>` :
    `<i class="fa fa-undo mr-3"></i>`;

  newTask.innerHTML = `
    <span class="id">${task.id}</span>
    <span>${task.name} <small class="text-muted ml-3">${task.dueDate}</small></span>
    <span class="float-right actions">
      ${doneOrNotIcon}
      <i class="far fa-edit text-dark mr-3" data-toggle="modal" data-target="#edit-task-modal"></i>
      <i class="far fa-trash-alt text-danger"></i>
    </span>`;

  taskList.appendChild(newTask);
};

UI.prototype.fillEditForm = function(id) {
  const store = new Store();
  const tasks = store.getTasks();

  let [taskID, taskName, dueDate, recurrence, priority] = [
    document.getElementById('e-task-id'),
    document.getElementById('e-task-name'),
    document.getElementById('e-task-due-date'),
    document.getElementById('e-task-recurrence'),
    document.getElementById('e-task-priority')
  ];

  tasks.forEach(function(task) {
    if(task.id === id) {
      [
        taskID.value,
        taskName.value,
        dueDate.value,
        recurrence.value,
        priority.value
      ] = [
        task.id,
        task.name,
        task.dueDate,
        task.recurrence,
        task.priority
      ];
    }
  });
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

UI.prototype.removeTask = function(target) {
  const liElem = target.parentElement.parentElement;

  liElem.remove();
};