
ui.Progressbar = function() {
  wr.construct(ui.Progressbar, this);
};


wr.inherit(ui.Progressbar, wr.View);


ui.Progressbar.prototype.create = function() {
  this.node = wr.DIV_c("ui_progressbar");
};
