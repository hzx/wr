
ui.Dialog = function() {
  ui.Dialog.base.constructor.call(this);

  this.titleText = "";
  this.userClass = "";
};


wr.inherit(ui.Dialog, wr.View);


ui.Dialog.prototype.create = function() {
  this.buttonClose = wr.DIV_c("ui_dialog_button_close");

  this.overlay = wr.DIV_c("ui_dialog_overlay");
  wr.setOpacity(this.overlay, 0.6);

  this.title = wr.DIV_ct("ui_dialog_title", this.titleText);

  this.content = wr.DIV_c("ui_dialog_content", [
  ]);

  this.wrap = wr.DIV_cc("ui_dialog_wrap", [
    this.buttonClose,
    this.content
  ]);

  this.node = wr.DIV_cc("ui_dialog", [
    this.overlay,
    wr.DIV_cc("ui_dialog_scroll", [
      this.wrap
    ])
  ]);

  wr.addClass(this.node, this.userClass);
};


ui.Dialog.prototype.enter = function() {
  ui.Dialog.base.enter.call(this);
};


ui.Dialog.prototype.exit = function() {
  ui.Dialog.base.exit.call(this);
};


ui.Dialog.prototype.show = function() {
  wr.fadeIn(this.node, wr.fastTime, wr.dummy);
};


ui.Dialog.prototype.hide = function() {
  wr.fadeIn(this.node, wr.fastTime, wr.dummy);
};
