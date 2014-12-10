
ui.Tabs = function() {
  ui.Tabs.base.constructor.call(this);

  this.store = {};

  this.active = null;
  this.meHeaderClick = wr.bind(this, this.onHeaderClick);
};
wr.inherit(ui.Tabs, wr.View);


ui.Tabs.prototype.create = function() {
  this.headers = wr.div_c("");
  this.content = wr.div_c("ui_tabs_content");

  this.node = wr.div_cc("ui_tabs", [
    wr.div_cc("ui_tabs_headers", [
      this.headers,
      wr.div_c("ui_tabs_clear")
    ]),
    this.content
  ]);
};


ui.Tabs.prototype.createTab = function(name, content) {
  var tab = wr.div_ct("ui_tabs_tab", name);
  tab.optionId = name;

  wr.hide(content);

  wr.appendChild(this.headers, tab);
  wr.appendChild(this.content, content);

  if (this.isEnter) {
    wr.listen(tab, "click", this.meHeaderClick);
  }
};


ui.Tabs.prototype.enter = function() {
  ui.Tabs.base.enter.call(this);

  // listen headers
  var child = this.headers.firstChild;
  while (child) {
    wr.listen(child, "click", this.meHeaderClick);
    child = child.nextSibling;
  }
};


ui.Tabs.prototype.exit = function() {
  // unlisten headers
  var child = this.headers.firstChild;
  while (child) {
    wr.unlisten(child, "click", this.meHeaderClick);
    child = child.nextSibling;
  }

  ui.Tabs.base.exit.call(this);
};


ui.Tabs.prototype.add = function(name, content) {
  this.store[name] = content;

  this.createTab(name, content);
};


ui.Tabs.prototype.remove = function(element) {
  if (this.active === element) {
    this.select(null);
  }

  if (this.isEnter) {
    wr.unlisten(element, "click", this.meHeaderClick);
  }

  wr.removeChild(this.headers, element);
  wr.removeChild(this.content, this.store[element.optionId]);
  delete this.store[element.optionId];
};


ui.Tabs.prototype.select = function(element) {
  if (this.active === element) return;

  if (this.active) {
    wr.removeClass(this.active, "select");
    wr.hide(this.store[this.active.optionId]);
  }

  if (!element && this.active) { // choose previous or next element
    if (this.active.prevSibling) element = this.active.prevSibling;
    else if (this.active.nextSibling) element = this.active.nextSibling;
  }

  if (element) {
    wr.addClass(element, "select");
    wr.show(this.store[element.optionId]);
  }
  this.active = element;
};


ui.Tabs.prototype.selectFirst = function() {
  this.select(this.headers.firstChild);
};


ui.Tabs.prototype.onHeaderClick = function(e) {
  this.select(e.target);
};
