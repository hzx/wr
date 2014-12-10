
ui.Scrollbar = function() {
  wr.construct(ui.Scrollbar, this);
};


wr.inherit(ui.Scrollbar, wr.View);


ui.Scrollbar.prototype.create = function() {
  this.node = wr.div_c("ui_scrollbar");
};


ui.Scrollbar.prototype.enter = function() {
  ui.Scrollbar.base.enter.call(this);
};


ui.Scrollbar.prototype.exit = function() {
  ui.Scrollbar.base.exit.call(this);
};
