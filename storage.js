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

Store.prototype.editTask = function(editedTask) {
  const store = new Store();
  const tasks = store.getTasks();

  // Update existing task w/o removing it first?
  tasks.forEach(function(task, index) {
    if(task.id === editedTask.id) {
      tasks.splice(index, 1);
    }
  });

  tasks.push(editedTask);
  store.updateTasks(tasks);
};

Store.prototype.checkmarkTask = function(id) {
  const store = new Store();
  const tasks = store.getTasks();

  tasks.forEach(function(task) {
    if(task.id === id) {
      task.done = true;
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