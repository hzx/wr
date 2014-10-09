
wr.View = function() {
  this.node = null;
  this.events = [];
  this.isEnter = false;
};


wr.View.prototype.create = function() {
  this.node = wr.DIV_c("wr_view");
};


wr.View.prototype.destroy = function() {
  delete this.node;
  this.node = null;
};


wr.View.prototype.enter = function() {
  this.isEnter = true;
  wr.listenBunch(this.events);
};


wr.View.prototype.exit = function() {
  this.isEnter = false;
  wr.unlistenBunch(this.events);
};
