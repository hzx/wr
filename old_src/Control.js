
wr.Control = function() {
  // init this before create
  this.obj = null;

  this.hash = null;
  // init node in create
  this.node = null;
  // events hold arrays [ node, name, handler ], declarative events
  // on/off, used in enter/exit
  this.events = [];
  this.inDocument = false;
};

wr.Control.prototype.create = function() {
  return wr.createElement("div");
};

wr.Control.prototype.destroy = function() {
  var i, e, length;
  for (i = 0, length = this.events.length; i < length; ++i) {
    e = this.events[i];
    e[0] = null;
    e[1] = null;
    e[2] = null;
    this.events[i] = null;
  }
  // never use it as array after destroy
  this.events = null;
};

wr.Control.prototype.enter = function() {
  var i, e, length;
  if (this.inDocument) {
    return false;
  }
  this.inDocument = true;
  for (i = 0, length = this.events.length; i < length; ++i) {
    e = this.events[i];
    wr.on(e[0], e[1], e[2]);
  }
};

wr.Control.prototype.exit = function() {
  var i, e, length;
  if (!this.inDocument) {
    return false;
  }
  this.inDocument = false;
  for (i = 0, length = this.events.length; i < length; ++i) {
    e = this.events[i];
    wr.off(e[0], e[1], e[2]);
  }
};
