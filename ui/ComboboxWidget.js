
ui.ComboboxWidget = function() {
  ui.ComboboxWidget.base.constructor.call(this);

  this.idCode = 1;
  this.nameCode = 2;
  this.textDefault = "";
  this.userClass = "ui_combobox_widget";
};
wr.inherit(ui.ComboboxWidget, wr.Widget);


ui.ComboboxWidget.prototype.create = function() {
  this.node = ui.create(ui.Combobox, {textDefault: this.textDefault,
    userClass: this.userClass});
};


ui.ComboboxWidget.prototype.enter = function() {
  ui.ComboboxWidget.base.enter.call(this);
  this.node.enter();
};


ui.ComboboxWidget.prototype.exit = function() {
  ui.ComboboxWidget.base.exit.call(this);
  this.node.exit();
};


ui.ComboboxWidget.prototype.updateId = function(old, id) {
  this.node.updateId(old, id);
};


ui.ComboboxWidget.prototype.empty = function() {
  this.node.empty();
};


ui.ComboboxWidget.prototype.update = function(id, params) {
  this.node.updateText(id, params[this.nameCode]);
};


ui.ComboboxWidget.prototype.insert = function(obj, beforeId) {
  this.append(obj);
};


ui.ComboboxWidget.prototype.append = function(obj) {
  this.node.add(obj[this.idCode], obj[this.nameCode]);
};


ui.ComboboxWidget.prototype.remove = function(id) {
  this.node.remove(id);
};
