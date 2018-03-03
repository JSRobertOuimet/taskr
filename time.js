function Time() {
  this.time = new Date();
}

Time.prototype.getToday = function() {
  const today = {
    date: parseValue(this.time.getDate()),
    month: parseValue(this.time.getMonth() + 1),
    year: this.time.getFullYear()
  };

  return `${today.year}-${today.month}-${today.date}`;

  function parseValue(value) {
    if(value < 10) {
      value = "0" + value;
    }
    return value;
  }
};