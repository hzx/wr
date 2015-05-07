
// View - Tag like element, more complex with own behavior

wr.View = function() {
  this.hash = wr.hash();
  this.element = null;
  this.events = [];

  this.isEnter = false;
};


wr.View.prototype.create = function() {
};


wr.View.prototype.destroy = function() {
};


wr.View.prototype.enter = function() {
  this.isEnter = true;
  wr.listenBunch(this.events);
};


wr.View.prototype.exit = function() {
  this.isEnter = false;
  wr.unlistenBunch(this.events);
};


wr.View.prototype.insert = function(child) {
};


wr.View.prototype.append = function(child) {
};


wr.View.prototype.appendBefore = function(child, beforeHash) {
};


wr.View.prototype.remove = function() {
};


wr.View.prototype.removeChild = function(hash) {
};


wr.View.prototype.removeChilds = function() {
};


wr.View.prototype.setValue = function(text) {
};


wr.View.prototype.addEvents = function(events) {
};
