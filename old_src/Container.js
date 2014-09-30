
// listen collection
wr.Container = function() {
  // init this before create
  this.ocollection = null;
  // create control from obj
  this.ocreate = null;

  // init node in create
  this.node = null;
  this.controls = {};
  this.inDocument = false;

  this.hashgen = new wr.HashGen();

  // bind events
  this.meInsert = wr.bind(this, this.onInsert);
  this.meInsertBefore = wr.bind(this, this.onInsertBefore);
  this.meAppend = wr.bind(this, this.onAppend);
  this.meRemove = wr.bind(this, this.onRemove);
  this.meMove = wr.bind(this, this.onMove);
  this.meRefresh = wr.bind(this, this.onRefresh);
};

wr.Container.prototype.createControl_ = function(obj) {
  var control = this.ocreate(obj);
  if (!control.obj) {
    control.obj = obj;
  }
  if (!control.hash) {
    if (this.ocollection) {
      control.hash = this.ocollection.getHash(obj);
    } else {
      control.hash = this.hashgen.create();
    }
  }
  return control;
};

// action - specific add to DOM action
wr.Container.prototype.addControl_ = function(control, action) {
  if (control.hash in this.controls) {
    return false;
  }
  this.controls[control.hash] = control;

  action(control);

  if (this.inDocument) {
    control.enter();
  }
};

wr.Container.prototype.removeControl = function(control) {
  if (!(control.hash in this.controls)) {
    return false;
  }
  if (this.inDocument) {
    control.exit();
  }
  if (control.node.parentNode) {
    control.node.parentNode.removeChild(control.node);
  }
  delete this.controls[control.hash];
};

wr.Container.prototype.empty = function() {
  var i;
  for (i in this.controls) {
    this.removeControl_(this.controls[i]);
  }
};

wr.Container.prototype.createFromCollection_ = function() {
  var i = this.ocollection.first;
  var me = this;
  while (i) {
    this.addControl_(this.createControl_(i.obj), function(control) {
      me.node.appendNode(control.node);
    });
    i = i.next;
  }
};

wr.Container.prototype.create = function() {
  var node = wr.createElement("div");
  this.createFromCollection_();
  return node;
};

wr.Container.prototype.destroy = function() {
  var hash;
  for (hash in this.controls) {
    this.controls[hash].destroy();
    this.controls[hash] = null;
  }
  // never use it as array after destroy
  this.controls = null;
};

wr.Container.prototype.enter = function() {
  var i;

  if (this.inDocument) {
    return false;
  }
  this.inDocument = true;

  this.ocollection.eventInsert.on(this.meInsert);
  this.ocollection.eventInsertBefore.on(this.meInsertBefore);
  this.ocollection.eventAppend.on(this.meAppend);
  this.ocollection.eventRemove.on(this.meRemove);
  this.ocollection.eventMove.on(this.meMove);
  this.ocollection.eventRefresh.on(this.meRefresh);

  for (i in this.controls) {
    this.controls[i].enter();
  }
};

wr.Container.prototype.exit = function() {
  var i;

  if (!this.inDocument) {
    return false;
  }
  this.inDocument = false;

  this.ocollection.eventInsert.off(this.meInsert);
  this.ocollection.eventInsertBefore.off(this.meInsertBefore);
  this.ocollection.eventAppend.off(this.meAppend);
  this.ocollection.eventRemove.off(this.meRemove);
  this.ocollection.eventMove.off(this.meMove);
  this.ocollection.eventRefresh.off(this.meRefresh);

  for (i in this.controls) {
    this.controls[i].exit();
  }
};

// ocollection events

wr.Container.prototype.onInsert = function(obj) {
  var me = this;
  this.addControl_(this.createControl_(obj), function(control) {
    if (me.node.hasChildNodes()) {
      me.node.insertBefore(control.node, me.node.firstChild);
    } else {
      me.node.appendChild(control.node);
    }
  });
};

wr.Container.prototype.onInsertBefore = function(obj, hash) {
  var me = this;
  this.addControl_(this.createControl_(obj), function(control) {
    var before = me.controls[hash];
    me.node.insertBefore(control.node, before.node);
  });
};

wr.Container.prototype.onAppend = function(obj) {
  var me = this;
  this.addControl_(this.createControl_(obj), function(control) {
    me.node.appendChild(control.node);
  });
};

wr.Container.prototype.onRemove = function(hash) {
  var control = this.controls[hash];
  if (control) {
    this.removeControl_(control);
  }
};

wr.Container.prototype.onMove = function(hash, before) {
  var control, beforeControl;
  control = this.controls[hash];
  beforeControl = this.controls[before];
  if (control && beforeControl) {
    if (this.inDocument) {
      control.exit();
    }
    this.node.removeChild(control.node);
    this.node.insertBefore(control.node, beforeControl.node);
    if (this.inDocument) {
      control.enter();
    }
  }
};

wr.Container.prototype.onRefresh = function() {
  this.empty();
  this.createFromCollection_();
};
