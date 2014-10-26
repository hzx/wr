
ui.Submenu = function() {
  ui.Submenu.base.constructor.call(this);

  // for user, init before create
  this.userClass = "";
  this.labelText = "";

  this.isExpand = false;

  this.eventClick = new wr.Event();

  this.meOptionClick = wr.bind(this, this.onOptionClick);
};


wr.inherit(ui.Submenu, wr.View);


ui.Submenu.prototype.create = function() {
  this.label = wr.DIV_ct("ui_submenu_label", this.labelText);
  this.options = wr.DIV_c("ui_submenu_options");

  wr.hide(this.options);

  this.node = wr.DIV_cc("ui_submenu", [
    this.label,
    this.options
  ]);

  this.events = [
    [this.label, "click", wr.bind(this, this.onLabelClick)]
  ];
};


ui.Submenu.prototype.enter = function() {
  ui.Submenu.base.enter.call(this);

  var child = this.options.firstChild;
  while (child) {
    wr.listen(child, "click", this.meOptionClick);
    child = child.nextSibling;
  }

  this.init();
};


ui.Submenu.prototype.exit = function() {
  ui.Submenu.base.exit.call(this);

  var child = this.options.firstChild;
  while (child) {
    wr.unlisten(child, "click", this.meOptionClick);
    child = child.nextSibling;
  }
};


// call this after create and add to DOM
// init options position
ui.Submenu.prototype.init = function() {
  this.options.style.top = wr.fullHeight(this.label) + "px";
};


ui.Submenu.prototype.add = function(element) {
  wr.addClass(element, "ui_submenu_option");
  wr.appendChild(this.options, element);

  if (this.isEnter) wr.listen(element, "click", this.meOptionClick);
};


ui.Submenu.prototype.addItems = function(items) {
  for (var i = 0, length = items.length; i < length; ++i)
    this.add(items[i]);
};


ui.Submenu.prototype.remove = function(element) {
  if (this.isEnter) wr.unlisten(element, "click", this.meOptionClick);

  wr.removeClass(element, "ui_submenu_option");
  wr.removeChild(this.options, element);
};


ui.Submenu.prototype.empty = function() {
  var child = this.options.firstChild;
};


ui.Submenu.prototype.select = function(element) {
  wr.addClass(element, "select");
};


ui.Submenu.prototype.unselect = function(element) {
  wr.removeClass(element, "select");
};


ui.Submenu.prototype.expand = function() {
  this.isExpand = true;
  wr.addClass(this.node, "expand");
  wr.slideFadeIn(this.options, wr.fastTime, wr.dummy);
};


ui.Submenu.prototype.collapse = function() {
  this.isExpand = false;
  wr.removeClass(this.node, "expand");
  wr.slideFadeOut(this.options, wr.fastTime, wr.dummy);
};


ui.Submenu.prototype.onLabelClick = function(e) {
  if (this.isExpand) this.collapse();
  else this.expand();
};


ui.Submenu.prototype.onOptionClick = function(e) {
  this.collapse();
};
