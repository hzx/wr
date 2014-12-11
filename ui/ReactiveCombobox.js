
ui.ReactiveCombobox = function(collection) {
  ui.ReactiveCombobox.base.constructor.call(this, collection);

  this.idCode = 1;
  this.nameCode = 2;
  this.textDefault = "";
  this.userClass = "ui_combobox_widget";
};
wr.inherit(ui.ReactiveCombobox, wr.ReactiveElement);


ui.ReactiveCombobox.prototype.create = function() {
  this.node = ui.create(ui.Combobox, {textDefault: this.textDefault,
    userClass: this.userClass});
};


ui.ReactiveCombobox.prototype.enter = function() {
  ui.ReactiveCombobox.base.enter.call(this);
  this.node.enter();
};


ui.ReactiveCombobox.prototype.exit = function() {
  ui.ReactiveCombobox.base.exit.call(this);
  this.node.exit();
};


ui.ReactiveCombobox.prototype.updateId = function(old, id) {
  this.node.updateId(old, id);
};


ui.ReactiveCombobox.prototype.empty = function() {
  this.node.empty();
};


ui.ReactiveCombobox.prototype.update = function(id, params) {
  if (this.nameCode in params)
    this.node.updateText(id, params[this.nameCode]);
};


ui.ReactiveCombobox.prototype.insert = function(obj, beforeId) {
  this.append(obj);
};


ui.ReactiveCombobox.prototype.append = function(obj) {
  this.node.add(obj[this.idCode], obj[this.nameCode]);
};


ui.ReactiveCombobox.prototype.remove = function(id) {
  this.node.remove(id);
};
