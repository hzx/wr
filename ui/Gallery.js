
ui.Gallery = function() {
  wr.construct(ui.Gallery, this);

  this.isFullscreen = false;
};


wr.inherit(ui.Gallery, wr.View);


ui.Gallery.prototype.create = function() {
  this.thumbs = wr.DIV_c("ui_gallery_thumbs");

  this.node = wr.DIV_cc("ui_gallery", [
    this.thumbs
  ]);
};


ui.Gallery.prototype.enter = function() {
  ui.Gallery.base.enter.call(this);
};


ui.Gallery.prototype.exit = function() {
  ui.Gallery.base.exit.call(this);
};


ui.Gallery.prototype.add = function() {
};


ui.Gallery.prototype.remove = function() {
};


ui.Gallery.prototype.empty = function() {
};
