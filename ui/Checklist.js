
ui.Checklist = function() {
  wr.construct(ui.Checklist, this);
};


wr.inherit(ui.Checklist, wr.View);


ui.Checklist.prototype.create = function() {
  this.node = wr.div_c("ui_checklist");
};


ui.Checklist.prototype.enter = function() {
  ui.Checklist.base.enter.call(this);
};


ui.Checklist.prototype.exit = function() {
  ui.Checklist.base.exit.call(this);
};


ui.Checklist.prototype.reset = function() {
};
