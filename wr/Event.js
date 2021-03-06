
wr.Event = function() {
  this.handlers = {};
};


wr.Event.prototype.listen = function(handler) {
  if (!handler.hash) {
    handler.hash = wr.hash();
  }

  this.handlers[handler.hash] = handler;
};


wr.Event.prototype.unlisten = function(handler) {
  if (handler.hash)
    delete this.handlers[handler.hash];
};


wr.Event.prototype.notify = function(e) {
  for (var hash in this.handlers) {
    this.handlers[hash](e);
  }
};


wr.Event.prototype.notify2 = function(e1, e2) {
  for (var hash in this.handlers) {
    this.handlers[hash](e1, e2);
  }
};
