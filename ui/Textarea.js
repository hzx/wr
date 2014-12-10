
ui.Textarea = function() {
  wr.construct(ui.Textarea, this);

  this.value = "";
  this.userClass = "";
  this.heightDelta = 24;
  this.eventChange = new wr.Event();
  this.eventBlur = new wr.Event();
};


wr.inherit(ui.Textarea, wr.View);


ui.Textarea.prototype.create = function() {
  this.input = wr.createElement("textarea");
  this.input.value = this.value;
  wr.addClass(this.input, "ui_textarea_input");

  this.node = wr.div_cc("ui_textarea", [
    this.input
  ]);

  wr.addClass(this.node, this.userClass);

  this.events = [
    [this.node, "click", wr.bind(this, this.onClick)],
    [this.input, "keyup", wr.bind(this, this.onInputKeyup)],
    [this.input, "change", wr.bind(this, this.onInputChange)],
    [this.input, "focus", wr.bind(this, this.onInputFocus)],
    [this.input, "blur", wr.bind(this, this.onInputBlur)]
  ];
};


ui.Textarea.prototype.enter = function() {
  ui.Textarea.base.enter.call(this);

  this.tuneHeight();
};


ui.Textarea.prototype.focus = function() {
  this.input.focus();
  this.setFocus(true);
};


ui.Textarea.prototype.clear = function() {
  this.setValue("");
};


ui.Textarea.prototype.tuneHeight = function() {
  var scroll = this.input.scrollHeight;
  var client = this.input.clientHeight;

  if (scroll > client) {
    this.node.style.height = (scroll + this.heightDelta) + "px";
  }
};


ui.Textarea.prototype.shrinkHeight = function() {
  // try minimal size
  this.node.style.height = "auto";
  this.tuneHeight();
};


ui.Textarea.prototype.setValue = function(value) {
  if (value === this.value) {
    return;
  }

  var old = this.value;

  this.value = value;
  this.input.value = value;

  this.tuneHeight();

  this.eventChange.notify2(old, value);
};


ui.Textarea.prototype.setFocus = function(isFocus) {
  if (isFocus) {
    wr.addClass(this.node, "focus");
  } else {
    wr.removeClass(this.node, "focus");
  }
};


ui.Textarea.prototype.onClick = function(e) {
  this.focus();
};


ui.Textarea.prototype.onInputKeyup = function(e) {
  if (e.keyCode === 27) {
    this.setValue("");
    this.shrinkHeight();
    return;
  }


  if (e.keyCode === 8 || e.keyCode === 46) { // backspace or delete
    this.shrinkHeight();
  } else {
    this.tuneHeight();
  }

  var value = wr.trimString(this.input.value);

  if (this.value !== value) {
    var old = this.value;
    this.value = value;

    this.eventChange.notify2(old, value);
  }
};


ui.Textarea.prototype.onInputChange = function(e) {
  var value = wr.trimString(this.input.value);

  if (this.value !== value) {
    var old = this.value;
    this.value = value;

    this.eventChange.notify2(old, value);
  }
};


ui.Textarea.prototype.onInputFocus = function(e) {
  this.setFocus(true);
};


ui.Textarea.prototype.onInputBlur = function(e) {
  this.setFocus(false);
  this.eventBlur.notify(this);
};
