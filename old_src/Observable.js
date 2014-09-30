
wr.Observable = function() {
  this.listeners = {};
  this.hashgen = new wr.HashGen();
};

wr.Observable.prototype.on = function(handler) {
  if (!handler.hash) {
    handler.hash = this.hashgen.create();
  }
  this.listeners[handler.hash] = handler;
};

wr.Observable.prototype.off = function(handler) {
  if (handler.hash && this.listeners[handler.hash]) {
    delete this.listeners[handler.hash];
  }
};

// TODO: check about memory management, maybe just do - this.listeners = {};
wr.Observable.prototype.offAll = function() {
  var name;
  for (name in this.listeners) {
    delete this.listeners[name];
  }
};
