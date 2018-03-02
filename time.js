function Time() {
  this.time = new Date();
}

Time.prototype.getToday = function() {
  const today = {
    date: this.time.getDate(),
    month: this.time.getMonth(),
    year: this.time.getFullYear()
  };

  return `${today.year}-${today.month + 1}-${today.date}`;
};