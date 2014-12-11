
ui.ReactiveRadiolist = function(collection) {
  ui.ReactiveRadiolist.base.constructor.call(this, collection);

  this.idCode = 1;
  this.nameCode = 2;
  this.textDefault = "";
  this.userClass = "ui_radiolist_widget";
};
wr.inherit(ui.ReactiveRadiolist, wr.ReactiveElement);


ui.ReactiveRadiolist.prototype.create = function() {
  this.node = ui.create(ui.Radiolist, {textDefault: this.textDefault,
    userClass: this.userClass});
};


ui.ReactiveRadiolist.prototype.enter = function() {
  ui.ReactiveRadiolist.base.enter.call(this);
  this.node.enter();
};


ui.ReactiveRadiolist.prototype.exit = function() {
  ui.ReactiveRadiolist.base.exit.call(this);
  this.node.exit();
};


ui.ReactiveRadiolist.prototype.createItem = function() {
  this.node.add(obj[this.idCode], obj[this.nameCode]);
};


ui.ReactiveRadiolist.prototype.empty = function() {
  this.node.empty();
};


ui.ReactiveRadiolist.prototype.updateId = function(old, id) {
  this.node.updateId(old, id);
};


ui.ReactiveRadiolist.prototype.update = function(id, params) {
  if (this.nameCode in params)
    this.node.updateText(id, params[this.nameCode]);
};


ui.ReactiveRadiolist.prototype.insert = function(obj, beforeId) {
  this.append(obj);
};


ui.ReactiveRadiolist.prototype.append = function(obj) {
  this.node.add(obj[this.idCode], obj[this.nameCode]);
};


ui.ReactiveRadiolist.prototype.remove = function(id) {
  this.node.remove(id);
};
