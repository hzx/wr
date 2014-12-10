
ui.Progressbar = function() {
  wr.construct(ui.Progressbar, this);
};


wr.inherit(ui.Progressbar, wr.View);


ui.Progressbar.prototype.create = function() {
  this.node = wr.div_c("ui_progressbar");
};
