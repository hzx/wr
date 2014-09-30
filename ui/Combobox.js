
ui.Combobox = function() {
  // for user, init before create
  this.userClass = "";
  this.textDefault = "";

  this.node = null;
  this.isEnter = false;
  this.eventChange = new wr.Event();
  this.last = null;
  this.events = [];

  this.meOptionClick = wr.bind(this, this.onOptionClick);
};


ui.Combobox.prototype.create = function() {
  this.more = wr.DIV_c("ui_combobox_more");

  this.input = wr.DIV_c("ui_combobox_input");
  this.input.type = "text";
  this.value = wr.DIV_cc("ui_combobox_value", [
    this.input,
    this.more
  ]);

  this.optionDefault = wr.DIV_ct("ui_combobox_default", this.textDefault);
  this.options = wr.DIV_c("ui_combobox_options");

  this.dropdown = wr.DIV_cc("ui_combobox_dropdown", [
    this.optionDefault,
    this.options
  ]);

  this.node = wr.DIV_cc("ui_combobox", [
    this.value,
    this.dropdown
  ]);

  wr.addClass(this.node, this.userClass);

  this.reset();

  this.events = [
    [this.node, "click", wr.bind(this, this.onClick)],
    [this.input, "keyup", wr.bind(this, this.onInputKeyup)],
    [this.input, "focus", wr.bind(this, this.onInputFocus)],
    [this.input, "blur", wr.bind(this, this.onInputBlur)],
    [this.more, "click", wr.bind(this, this.onMoreClick)],
    [this.optionDefault, "click", wr.bind(this, this.onDefaultClick)]
  ];
};


ui.Combobox.prototype.destroy = function() {
  delete this.node;
  this.node = null;
};


ui.Combobox.prototype.enter = function() {
  this.isEnter = true;
  wr.listenBunch(this.events);
  // listen options
  var child = this.options.firstChild;
  while (child) {
    wr.listen(child, "click", this.meOptionClick);
    child = child.nextSibling;
  }
};


ui.Combobox.prototype.exit = function() {
  this.isEnter = false;
  wr.unlistenBunch(this.events);
  // unlisten options
  var child = this.options.firstChild;
  while (child) {
    wr.unlisten(child, "click", this.meOptionClick);
    child = child.nextSibling;
  }
};


ui.Combobox.prototype.reset = function() {
  this.selectOption(this.optionDefault);
};


ui.Combobox.prototype.addOption = function(id, text) {
  var option = wr.DIV_ct("ui_combobox_option", text);
  option.optionId = id;

  wr.appendChild(this.options, option);

  if (this.isEnter) {
    wr.listen(option, "click", this.meOptionClick);
  }
}


ui.Combobox.prototype.removeOption = function(id, text) {
  var option = this.options.firstChild;
  while (option) {
    if (option.optionId === id) {
      if (this.isEnter) {
        wr.unlisten(option, "click", this.meOptionClick);
      }

      wr.removeChild(this.options, option);
      break;
    }
    child = child.nextSibling;
  }
};


ui.Combobox.prototype.selectOption = function(element) {
  // not select twice
  if (this.last === element) {
    return;
  }

  if (this.last) {
    wr.removeClass(this.last, "select");
  }

  var old = this.last ? this.last.optionId : null;
  this.last = element;

  if (old !== element.optionId) {
    this.eventChange.notify(old, element.optionId);
  }
};


ui.Combobox.prototype.hideMore = function() {
  wr.slideFadeOut(this.dropdown, 600, function() {});
};


ui.Combobox.prototype.showMore = function() {
  wr.slideFadeIn(this.dropdown, 600, function() {});
};


ui.Combobox.prototype.onDefaultClick = function(e) {
  this.reset();
  this.hideMore();
};


ui.Combobox.prototype.onOptionClick = function(e) {
  this.selectOption(e.target);
  this.hideMore();
};


ui.Combobox.prototype.onClick = function(e) {
};


ui.Combobox.prototype.onInputKeyup = function(e) {
};


ui.Combobox.prototype.onInputFocus = function(e) {
};


ui.Combobox.prototype.onInputBlur = function(e) {
};


ui.Combobox.prototype.onMoreClick = function(e) {
  this.showMore();
};
