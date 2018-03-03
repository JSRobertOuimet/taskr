function Task(id, name, dueDate, recurrence, priority) {
  this.id = id;
  this.name = name;
  this.dueDate = dueDate;
  this.recurrence = recurrence;
  this.priority = priority;

  this.done = false;
  this.opacity = '1';
}