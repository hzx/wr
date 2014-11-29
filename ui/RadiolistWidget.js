
ui.RadiolistWidget = function() {
  ui.RadiolistWidget.base.constructor.call(this);

  this.idCode = 1;
  this.nameCode = 2;
  this.textDefault = "";
  this.userClass = "ui_radiolist_widget";
};
wr.inherit(ui.RadiolistWidget, wr.Widget);


ui.RadiolistWidget.prototype.create = function() {
  this.node = ui.create(ui.Radiolist, {textDefault: this.textDefault,
    userClass: this.userClass});
};


ui.RadiolistWidget.prototype.enter = function() {
  ui.RadiolistWidget.base.enter.call(this);
  this.node.enter();
};


ui.RadiolistWidget.prototype.exit = function() {
  ui.RadiolistWidget.base.exit.call(this);
  this.node.exit();
};


ui.RadiolistWidget.prototype.createItem = function() {
  this.node.add(obj[this.idCode], obj[this.nameCode]);
};


ui.RadiolistWidget.prototype.changeId = function(old, id) {
  this.node.updateId(old, id);
};


ui.RadiolistWidget.prototype.update = function(params) {
  if (this.nameCode in params)
    this.node.updateText(obj[this.idCode], obj[this.nameCode]);
};


ui.RadiolistWidget.prototype.insert = function(obj, beforeId) {
  this.append(obj);
};


ui.RadiolistWidget.prototype.append = function(obj) {
  this.node.add(obj[this.idCode], obj[this.nameCode]);
};


ui.RadiolistWidget.prototype.remove = function(id) {
  this.node.remove(id);
};
