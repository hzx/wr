
wr.DragDrop = function() {
  this.owner = null;
  this.elements = [];
  this.isEnter = false;
};


wr.DragDrop.prototype.create = function(owner) {
  this.owner = owner;
};


wr.DragDrop.prototype.destroy = function() {
  this.area = null;
};


wr.DragDrop.prototype.enter = function() {
  if (this.isEnter) return;
  this.isEnter = true;
};


wr.DragDrop.prototype.exit = function() {
  if (!this.isEnter) return;
  this.isEnter = false;
};


wr.DragDrop.prototype.watch = function(elem) {
  this.elements.push(elem);
  if (this.isEnter) {
  }
};


wr.DragDrop.prototype.unwatch = function(elem) {
  if (this.isEnter) {
  }
};


wr.DragDrop.prototype.onMousedown = function(e) {
};


wr.DragDrop.prototype.onMouseup = function(e) {
};


wr.DragDrop.prototype.onMousemove = function(e) {
};
