
ui.Progressbar = function() {
  ui.Progressbar.base.constructor.call(this);
};
wr.inherit(ui.Progressbar, wr.View);


ui.Progressbar.prototype.create = function() {
  this.node = wr.div_c("ui_progressbar");
};
