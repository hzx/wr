
wr.ObservableValue = function(value) {
  ObservableValue.base.constructor.call(this);
  this.value = value;
};
wr.inherits(wr.ObservableValue, wr.Observable);

wr.ObservableValue.prototype.setValue = function(value) {
  var old;

  if (value !== this.value) {
    old = this.value;
    this.value = value;
    this.notify(old, value);
  }
};

wr.ObservableValue.prototype.notify = function(old, value) {
  var hash;
  for (hash in this.listeners) {
    this.listeners[hash](old, value);
  }
};
