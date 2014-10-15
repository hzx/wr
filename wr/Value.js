
wr.Value = function(value) {
  this.value = value;

  this.eventChange = new wr.Event();
};


wr.Value.prototype.set = function(value) {
  if (this.value !== value) {
    var old = this.value;
    this.value = value;
    this.eventChange.notify2(old, value);
  }
};
