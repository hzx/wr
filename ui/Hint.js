
ui.Hint = function(userClass) {
  wr.construct(ui.Hint, this);

  this.userClass = userClass;
};


wr.inherit(ui.Hint, wr.View);


ui.Hint.prototype.create = function() {
  this.icon = wr.DIV_c("ui_hint_icon");
  this.message = wr.DIV_c("ui_hint_message");

  this.node = wr.DIV_cc("ui_hint", [
    this.icon,
    this.message
  ]);

  wr.addClass(this.node, this.userClass);
};


ui.Hint.prototype.enter = function() {
};


ui.Hint.prototype.exit = function() {
};


ui.Hint.prototype.show = function(flag) {
};
