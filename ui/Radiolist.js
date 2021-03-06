
ui.Radiolist = function() {
  ui.Radiolist.base.constructor.call(this);

  // for user, init before create
  this.userClass = "";
  this.idDefault = null;
  this.textDefault = "";

  this.isEnter = false;
  this.eventChange = new wr.Event();
  this.last = null;

  this.meOptionClick = wr.bind(this, this.onOptionClick);
};
wr.inherit(ui.Radiolist, wr.View);


ui.Radiolist.prototype.create = function() {
  this.optionDefault = wr.div_ct("ui_radiolist_default", this.textDefault);
  this.optionDefault.optionId = this.idDefault;

  this.options = wr.div_c("ui_radiolist_options");
  
  this.node = wr.div_cc("ui_radiolist", [
    this.optionDefault,
    this.options
  ]);

  wr.addClass(this.node, this.userClass);

  this.reset();

  this.events = [
    [this.optionDefault, "click", wr.bind(this, this.onDefaultClick)]
  ];
};


ui.Radiolist.prototype.enter = function() {
  this.isEnter = true;
  wr.listenBunch(this.events);
  // listen options
  var child = this.options.firstChild;
  while (child) {
    wr.listen(child, "click", this.meOptionClick);
    child = child.nextSibling;
  }
};


ui.Radiolist.prototype.exit = function() {
  this.isEnter = false;
  wr.unlistenBunch(this.events);
  // unlisten options
  var child = this.options.firstChild;
  while (child) {
    wr.unlisten(child, "click", this.meOptionClick);
    child = child.nextSibling;
  }
};


ui.Radiolist.prototype.add = function(id, text) {
  var option = wr.div_ct("ui_radiolist_option", text);
  option.optionId = id;

  wr.appendChild(this.options, option);

  if (this.isEnter) {
    wr.listen(option, "click", this.meOptionClick);
  }

  return option;
};


ui.Radiolist.prototype.empty = function() {
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


ui.Radiolist.prototype.updateText = function(id, text) {
  var option = this.get(id);
  if (option) wr.setText(option, text);
};


ui.Radiolist.prototype.remove = function(id) {
  var option = this.get(id);
  if (option) {
    // reset selected option
    if (option === this.last) this.reset();
    if (this.isEnter) {
      wr.unlisten(option, "click", this.meOptionClick);
    }
    wr.removeChild(this.options, option);
  }
};


ui.Radiolist.prototype.updateId = function(old, id) {
  var option = this.get(old);
  if (option) option.optionId = id;
};


ui.Radiolist.prototype.get = function(id) {
  var option = this.options.firstChild;
  while (option) {
    if (option.optionId === id) {
      return option;
    }
    option = option.nextSibling;
  }
  return null;
};


ui.Radiolist.prototype.getSelected = function() {
  return this.last ? this.last.optionId : null;
};


ui.Radiolist.prototype.select = function(id) {
  var option = this.get(id);
  if (option) {
    this.selectOption(option, false);
  }
};


ui.Radiolist.prototype.selectOption = function(element, silent) {
  // not select twice
  if (this.last === element) {
    return;
  }

  if (this.last) {
    wr.removeClass(this.last, "select");
  }

  var old = this.last ? this.last.optionId : null;
  this.last = element;

  wr.addClass(element, "select");

  if (!silent) this.eventChange.notify2(old, element.optionId);
};


ui.Radiolist.prototype.reset = function() {
  this.selectOption(this.optionDefault, false);
};


ui.Radiolist.prototype.resetSilent = function() {
  this.selectOption(this.optionDefault, true);
};


ui.Radiolist.prototype.onDefaultClick = function(e) {
  this.reset();
};


ui.Radiolist.prototype.onOptionClick = function(e) {
  this.selectOption(e.target, false);
};
