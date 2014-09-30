
wr.Event = function() {
  wr.Event.base.constructor.call(this);
};
wr.inherits(wr.Event, wr.Observable);

wr.Event.prototype.notify = function(e) {
  var hash;
  for (hash in this.listeners) {
    this.listeners[hash](e);
  }
};


wr.Event0 = function() {
  Event0.base.constructor.call(this);
};
wr.inherits(wr.Event0, wr.Observable);

wr.Event0.prototype.notify = function() {
  var hash;
  for (hash in this.listeners) {
    this.listeners[hash]();
  }
};


wr.Event2 = function() {
  Event2.base.constructor.call(this);
};
wr.inherits(wr.Event2, wr.Observable);

wr.Event2.prototype.notify = function(p1, p2) {
  var hash;
  for (hash in this.listeners) {
    this.listeners[hash](p1, p2);
  }
};
