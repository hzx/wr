
wr.View = function() {
  this.node = null;
  this.events = [];
};


wr.View.prototype.create = function() {
  this.node = wr.DIV_("wr_view");
};


wr.View.prototype.destroy = function() {
  delete this.node;
  this.node = null;
};


wr.View.prototype.enter = function() {
  wr.listenBunch(this.events);
};


wr.View.prototype.exit = function() {
  wr.unlistenBunch(this.events);
};
