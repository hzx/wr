
ui.Textarea = function() {
  wr.construct(ui.Textarea, this);
};


wr.inherit(ui.Textarea, wr.View);


ui.Textarea.prototype.create = function() {
  this.node = wr.DIV_c("ui_textarea");
};


ui.Textarea.prototype.validate = function() {
  return false;
};
