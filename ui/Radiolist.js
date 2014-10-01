
ui.Radiolist = function() {
  // for user, init before create
  this.userClass = "";
  this.textDefault = "";

  this.isEnter = false;
  this.events = [];
  this.eventChange = new wr.Event();
  this.last = null;

  this.meOptionClick = wr.bind(this, this.onOptionClick);
};


ui.Radiolist.prototype.create = function() {
  this.optionDefault = wr.DIV_ct("ui_radiolist_default", this.textDefault);
  this.options = wr.DIV_c("ui_radiolist_options");
  
  this.node = wr.DIV_cc("ui_radiolist", [
    this.optionDefault,
    this.options
  ]);

  wr.addClass(this.node, this.userClass);

  this.reset();

  this.events = [
    [this.optionDefault, "click", wr.bind(this, this.onDefaultClick)]
  ];
};


ui.Radiolist.prototype.destroy = function() {
  delete this.node;
  this.node = null;
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


ui.Radiolist.prototype.addOption = function(id, text) {
  var option = wr.DIV_ct("ui_radiolist_option", text);
  option.optionId = id;

  wr.appendChild(this.options, option);

  if (this.isEnter) {
    wr.listen(option, "click", this.meOptionClick);
  }
};


ui.Radiolist.prototype.updateText = function(id, text) {
  var option = this.options.firstChild;
  while (option) {
    if (option.optionId === id) {
      wr.setText(option, text);
    }
    child = child.nextSibling;
  }
};


ui.Radiolist.prototype.removeOption = function(id) {
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


ui.Radiolist.prototype.selectOption = function(element) {
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

  this.eventChange.notify(old, element.optionId);
};


ui.Radiolist.prototype.reset = function() {
  this.selectOption(this.optionDefault);
};


ui.Radiolist.prototype.onDefaultClick = function(e) {
  this.reset();
};


ui.Radiolist.prototype.onOptionClick = function(e) {
  this.selectOption(e.target);
};
