
ui.Dialog = function() {
  ui.Dialog.base.constructor.call(this);

  this.titleText = "";
  this.userClass = "";

  this.meClose = wr.bind(this, this.onClose);
};
wr.inherit(ui.Dialog, wr.View);


ui.Dialog.prototype.create = function() {
  this.buttonClose = wr.div_c("ui_dialog_button_close");

  this.overlay = wr.div_c("ui_dialog_overlay");
  wr.setOpacity(this.overlay, 0.6);

  this.title = wr.div_ct("ui_dialog_title", this.titleText);

  this.content = wr.div_c("ui_dialog_content", [
  ]);

  this.wrap = wr.div_cc("ui_dialog_wrap", [
    this.buttonClose,
    this.content
  ]);

  this.node = wr.div_cc("ui_dialog", [
    this.overlay,
    wr.div_cc("ui_dialog_scroll", [
      this.wrap
    ])
  ]);

  wr.hide(this.node);

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
  wr.fadeOut(this.node, wr.fastTime, wr.dummy);
};
