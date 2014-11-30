
ui.Combobox = function() {
  wr.construct(ui.Combobox, this);

  // for user, init before create
  this.userClass = "";
  this.textDefault = "";
  this.idDefault = null;

  this.isExpand = false;
  this.editValue = "";
  this.isEnter = false;
  this.eventChange = new wr.Event();
  this.last = null;
  this.storeOptions = [];

  this.meOptionClick = wr.bind(this, this.onOptionClick);
};


wr.inherit(ui.Combobox, wr.View);


ui.Combobox.prototype.create = function() {
  this.value = wr.DIV_ct("ui_combobox_value", "");

  this.input = wr.INPUT_c("ui_combobox_input");
  this.input.type = "text";
  this.edit = wr.DIV_cc("ui_combobox_edit", [
    this.input
  ]);

  this.optionDefault = wr.DIV_ct("ui_combobox_default", this.textDefault);
  this.optionDefault.optionId = this.idDefault;

  this.options = wr.DIV_c("ui_combobox_options");

  this.dropdown = wr.DIV_cc("ui_combobox_dropdown", [
    this.edit,
    this.optionDefault,
    this.options
  ]);
  wr.hide(this.dropdown);

  this.node = wr.DIV_cc("ui_combobox", [
    this.value,
    this.dropdown
  ]);

  wr.addClass(this.node, this.userClass);

  this.reset();

  this.events = [
    [this.node, "blur", wr.bind(this, this.onBlur)],
    [this.value, "click", wr.bind(this, this.onValueClick)],
    [this.edit, "click", wr.bind(this, this.onEditClick)],
    [this.input, "keyup", wr.bind(this, this.onInputKeyup)],
    [this.input, "focus", wr.bind(this, this.onInputFocus)],
    [this.input, "blur", wr.bind(this, this.onInputBlur)],
    [this.optionDefault, "click", wr.bind(this, this.onDefaultClick)]
  ];
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

  this.init();
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


// call this after create and add to DOM
// init dropdown position
ui.Combobox.prototype.init = function() {
  this.dropdown.style.top = wr.fullHeight(this.value) + "px";
  this.dropdown.style.width = wr.fullWidth(this.value) + "px";
};


ui.Combobox.prototype.reset = function() {
  this.selectOption(this.optionDefault, false);
};


ui.Combobox.prototype.resetSilent = function() {
  this.selectOption(this.optionDefault, true);
};


ui.Combobox.prototype.add = function(id, text) {
  this.storeOptions.push([id, text]);
  this.addOptionElement(id, text);
}


ui.Combobox.prototype.addOptionElement = function(id, text) {
  var option = wr.DIV_ct("ui_combobox_option", text);
  option.optionId = id;

  wr.appendChild(this.options, option);

  if (this.isEnter) {
    wr.listen(option, "click", this.meOptionClick);
  }
};


ui.Combobox.prototype.remove = function(id) {
  var option = this.get(id);
  if (option) {
    if (this.isEnter) wr.unlisten(option, "click", this.meOptionClick);
    wr.removeChild(this.options, option);

    for (var i = 0, length = this.storeOptions.length; i < length; ++i) {
      if (this.storeOptions[i][0] === id) {
        this.storeOptions.splice(i, 1);
        break;
      }
    }
  }
};


ui.Combobox.prototype.updateId = function(old, id) {
  var option = this.get(old);
  if (option) option.optionId = id;
};


ui.Combobox.prototype.emptyOptions = function() {
  var child = this.options.firstChild;
  var next;

  while (child) {
    next = child.nextSibling;

    if (this.isEnter) {
      wr.unlisten(child, "click", this.meOptionClick);
    }

    wr.removeChild(this.options, child);
    child = next;
  }

  this.reset();
};


ui.Combobox.prototype.empty = function() {
  this.storeOptions = [];
  this.emptyOptions();
};


ui.Combobox.prototype.get = function(id) {
  var child = this.options.firstChild;

  while (child) {
    if (child.optionId === id) return child;
    child = child.nextSibling;
  }

  return null;
};


ui.Combobox.prototype.getSelected = function() {
  return this.last ? this.last.optionId : null;
};


ui.Combobox.prototype.select = function(id) {
  var option = this.getOption(id);
  if (option) this.selectOption(option, true);
};


ui.Combobox.prototype.selectSilent = function(id) {
  var option = this.getOption(id);
  if (option) this.selectOption(option, false);
};


ui.Combobox.prototype.fillOptions = function(options) {
  var option;
  for (var i = 0, length = options.length; i < length; ++i) {
    option = options[i];
    this.addOptionElement(option[0], option[1]);
  }
};


ui.Combobox.prototype.updateText = function(id, text) {
  for (var i = 0, length = this.storeOptions.length; i < length; ++i) {
    if (this.storeOptions[i][0] === id) {
      this.storeOptions[i][1] = text;
      break;
    }
  }

  var child = this.options.firstChild;
  while (child) {
    if (child.optionId === id) {
      wr.setText(child, text);
      break;
    }
    child = child.nextSibling;
  }
};


ui.Combobox.prototype.selectOption = function(element, silent) {
  // not select twice
  if (this.last === element) {
    return;
  }

  if (this.last) {
    wr.removeClass(this.last, "select");
  }

  var old = this.last ? this.last.optionId : null;
  this.last = element;

  wr.setText(this.value, wr.getText(this.last));

  if (!silent) this.eventChange.notify2(old, element.optionId);
};


ui.Combobox.prototype.collapse = function() {
  this.isExpand = false;
  wr.removeClass(this.node, "expand");
  wr.slideFadeOut(this.dropdown, wr.fastTime, wr.dummy);
};


ui.Combobox.prototype.expand = function() {
  this.isExpand = true;
  wr.addClass(this.node, "expand");
  wr.setStyle(this.dropdown, "height", "auto");
  wr.slideFadeIn(this.dropdown, wr.fastTime, wr.dummy);
  this.focusEdit();
};


ui.Combobox.prototype.filter = function() {
  var value = this.editValue.toLowerCase();

  this.emptyOptions();

  if (value.length === 0) {
    this.fillOptions(this.storeOptions);
  } else {
    // fill filtered options from storeOptions
    var words;
    for (var i = 0, length = this.storeOptions.length; i < length; ++i) {
      // split text by words and compare with every word
      words = this.storeOptions[i][1].toLowerCase().split(' ');
      for (var w = 0, wlength = words.length; w < wlength; ++w) {
        if (wr.stringStartsWith(words[w], value)) {
          this.addOptionElement(this.storeOptions[i][0], this.storeOptions[i][1]);
          break;
        }
      }
    }
  }

  wr.setStyle(this.dropdown, "height", "auto");
};


ui.Combobox.prototype.setEditFocus = function(isFocus) {
  if (isFocus) {
    wr.addClass(this.edit, "focus");
  } else {
    wr.removeClass(this.edit, "focus");
  }
};


ui.Combobox.prototype.focusEdit = function() {
  this.input.focus();
  this.setEditFocus(true);
};


ui.Combobox.prototype.clearEdit = function() {
  this.editValue = "";
  this.input.value = "";
};


ui.Combobox.prototype.onDefaultClick = function(e) {
  this.reset();
  this.collapse();
};


ui.Combobox.prototype.onOptionClick = function(e) {
  this.selectOption(e.target, false);
  this.collapse();
};


ui.Combobox.prototype.onEditClick = function(e) {
  this.focusEdit();
};


ui.Combobox.prototype.onInputKeyup = function(e) {
  if (e.keyCode === 27) {
    this.clearEdit();
    this.filter();
    return;
  }
  // filter options
  var value = wr.trimString(this.input.value);
  if (this.editValue !== value) {
    this.editValue = value;
    this.filter();
  }
};


ui.Combobox.prototype.onInputFocus = function(e) {
  this.focusEdit();
};


ui.Combobox.prototype.onInputBlur = function(e) {
  this.setEditFocus(false);
};


ui.Combobox.prototype.onBlur = function(e) {
  wr.log("Combobox.onBlur");
};


ui.Combobox.prototype.onValueClick = function(e) {
  if (this.isExpand) {
    this.collapse();
  } else {
    this.expand();
  }
};
