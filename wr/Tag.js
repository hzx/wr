
// Tag - wrapper around standard html tags
// TODO: think about properties

wr.Tag = function(name) {
  this.hash = wr.hash();
  this.node = document.createElement(name);
  this.parent = null;
  this.prev = null;
  this.next = null;
  this.events = [];

  this.isEnter = false;
};


wr.Tag.prototype.enter = function() {
};


wr.Tag.prototype.exit = function() {
};


wr.Tag.prototype.insert = function(child) {
};


wr.Tag.prototype.append = function(child) {
};


wr.Tag.prototype.appendBefore = function(child, beforeHash) {
};


wr.Tag.prototype.remove = function(hash) {
};


wr.Tag.prototype.removeChild = function(hash) {
};


wr.Tag.prototype.removeChilds = function() {
};


wr.Tag.prototype.setValue = function(text) {
};
