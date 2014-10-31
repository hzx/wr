
wr.Widget = function() {
  wr.Widget.base.constructor.call(this);

  this.userClass = "";

  this.elements = {};
  this.container = null;
};
wr.inherit(wr.Widget, wr.View);


wr.Widget.prototype.create = function() {
  this.node = wr.DIV_c(this.userClass);
};


wr.Widget.prototype.createItem = function(obj) {
  wr.log("override Widget.createItem");
  return null;
};


wr.Widget.prototype.enter = function() {
  wr.Widget.base.enter.call(this);

  for (var id in this.elements) {
    this.listenItem(this.elements[id]);
  }
};


wr.Widget.prototype.exit = function() {
  wr.Widget.base.exit.call(this);

  for (var id in this.elements) {
    this.unlistenItem(this.elements[id]);
  }
};


wr.Widget.prototype.listenItem = function(element) {
  wr.log("override Widget.listenItem");
};


wr.Widget.prototype.unlistenItem = function(element) {
  wr.log("override Widget.unlistenItem");
};


wr.Widget.prototype.removeElement = function(element) {
  if (this.isEnter) {
    this.unlistenItem(element);
  }

  this.node.removeChild(element);
};


wr.Widget.prototype.empty = function() {
  this.elements = {};

  var child = this.node.firstChild;
  var next;
  while (child) {
    next = child.nextSibling;
    this.removeElement(child);
    child = next;
  }
};


wr.Widget.prototype.insertElement = function(element, beforeId) {
  if (!beforeId || !(beforeId in this.elements)) {
    // insert in beginning
    this.node.insertBefore(element, this.node.firstChild);
  } else {
    this.node.insertBefore(element, this.elements[beforeId]);
  }

  this.elements[element.objId] = element;

  this.listenItem(element);
};


wr.Widget.prototype.changeId = function(old, id) {
  // update id in elements
  var element = this.elements[old];
  if (!element) return;

  if (element.objId !== id) element.objId = id;

  delete this.elements[old];
  this.elements[id] = element;
};


wr.Widget.prototype.update = function(params) {
  wr.log("override Widget.update");
};


wr.Widget.prototype.insert = function(obj, beforeId) {
  var element = this.createItem(obj);
  element.objId = obj[1];

  this.insertElement(element, beforeId);
};


wr.Widget.prototype.append = function(obj) {
  var id = obj[1];
  var element = this.createItem(obj);
  element.objId = id;

  this.node.appendChild(element);

  this.elements[id] = element;

  this.listenItem(element);
};


wr.Widget.prototype.remove = function(id) {
  if (!(id in this.elements)) return;
  var element = this.elements[id];

  delete this.elements[id];
  this.removeElement(element);
};


wr.Widget.prototype.move = function(id, beforeId) {
  if (!(id in this.elements)) return;
  var element = this.elements[id];

  this.removeElement(element);

  this.insertElement(element, beforeId);
};
