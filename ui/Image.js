
ui.Image = function() {
  ui.Image.base.constructor.call(this);

  // for user, init before create
  this.userClass = "";
  this.src = "";
};
wr.inherit(ui.Image, wr.View);


ui.Image.prototype.create = function() {
  this.img = wr.createElement("img");
  this.setSrc(this.src);

  this.node = wr.DIV_cc("ui_image", [
    this.img
  ]);

  wr.addClass(this.node, this.userClass);
};


ui.Image.prototype.setSrc = function(src) {
  this.src = src;
  if (this.src.length > 0) {
    this.img.src = src;
  }
};
