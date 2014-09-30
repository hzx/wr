
ui.Edit = function() {
  this.value = "";
  this.userClass = "";
  this.validateValue = null;
  this.type = "text";

  this.eventChange = new wr.Event();

  this.node = null;
  this.input = null;
  this.events = [];
};


ui.Edit.prototype.create = function() {
  this.input = wr.INPUT_c("ui_edit_input");
  this.input.value = this.value;
  this.input.type = this.type;
  this.wrap = wr.DIV_cc("ui_edit_wrap", [
    this.input
  ]);

  this.node = wr.DIV_cc("ui_edit", [
    this.wrap
  ]);

  wr.addClass(this.node, this.userClass);

  this.events = [
    [this.node, "click", wr.bind(this, this.onClick)],
    [this.input, "keyup", wr.bind(this, this.onInputKeyup)],
    [this.input, "focus", wr.bind(this, this.onInputFocus)],
    [this.input, "blur", wr.bind(this, this.onInputBlur)]
  ];
};


ui.Edit.prototype.destroy = function() {
  delete this.node;
  this.node = null;
};


ui.Edit.prototype.enter = function() {
  wr.listenBunch(this.events);
};


ui.Edit.prototype.exit = function() {
  wr.unlistenBunch(this.events);
};


ui.Edit.prototype.focus = function() {
  this.input.focus();
  this.setFocus(true);
};


ui.Edit.prototype.setFocus = function(isFocus) {
  if (isFocus) {
    wr.addClass(this.node, "focus");
  } else {
    wr.removeClass(this.node, "focus");
  }
};


ui.Edit.prototype.clear = function() {
  this.value = "";
  this.input.value = "";
};


ui.Edit.prototype.validate = function() {
  var value = wr.trimString(this.input.value);
  if (value.length == 0) return true;
  var isvalid = this.validateValue ? this.validateValue(value) : false;
  return isvalid;
};


ui.Edit.prototype.validateChange = function() {
  var isvalid = this.validate();

  if (isvalid) {
    wr.removeClass(this.node, "error");

    var newValue = wr.trimString(this.input.value);

    if (this.value !== newValue) {
      var oldValue = this.value;
      this.value = newValue;
      this.eventChange.notify2(oldValue, newValue);
    }
    return true;
  } else {
    wr.addClass(this.node, "error");
  }

  return isvalid;
};


ui.Edit.prototype.onClick = function(e) {
  this.focus();
};


ui.Edit.prototype.onInputKeyup = function(e) {
  if (e.keyCode === 27) {
    this.clear();
  }
  this.validateChange();
};


ui.Edit.prototype.onInputFocus = function(e) {
  this.setFocus(true);
};


ui.Edit.prototype.onInputBlur = function(e) {
  this.setFocus(false);
};
