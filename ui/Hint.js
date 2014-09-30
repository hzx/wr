
ui.Hint = function(userClass) {
  this.userClass = userClass;
  this.node = null;
};


ui.Hint.prototype.create = function() {
  this.icon = wr.DIV_c("ui_hint_icon");
  this.message = wr.DIV_c("ui_hint_message");

  this.node = wr.DIV_cc("ui_hint", [
    this.icon,
    this.message
  ]);

  wr.addClass(this.node, this.userClass);
};


ui.Hint.prototype.destroy = function() {
  delete this.node;
  this.node = null;
};


ui.Hint.prototype.enter = function() {
};


ui.Hint.prototype.exit = function() {
};


ui.Hint.prototype.show = function(flag) {
};
