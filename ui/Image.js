
ui.Image = function() {
  wr.construct(ui.Image, this);
};


wr.inherit(ui.Image, wr.View);


ui.Image.prototype.create = function() {
  this.node = wr.DIV_c("ui_image");
};
