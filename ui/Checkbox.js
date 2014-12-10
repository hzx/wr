
ui.Checkbox = function() {
  ui.Checkbox.base.constructor.call(this);
};
wr.inherit(ui.Checkbox, wr.View);


ui.Checkbox.prototype.create = function() {
  this.node = wr.div_c("ui_checkbox");
};


ui.Checkbox.prototype.enter = function() {
  ui.Checkbox.base.enter.call(this);
};


ui.Checkbox.prototype.exit = function() {
  ui.Checkbox.base.exit.call(this);
};


ui.Checkbox.prototype.init = function() {
};


ui.Checkbox.prototype.reset = function() {
};


ui.Checkbox.prototype.add = function(id, text) {
};


ui.Checkbox.prototype.remove = function(id) {
};


ui.Checkbox.prototype.empty = function() {
};


ui.Checkbox.prototype.select = function(id) {
};


ui.Checkbox.prototype.unselect = function(id) {
};
