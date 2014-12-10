
ui.Calendar = function() {
  ui.Calendar.base.constructor.call(this);
};
wr.inherit(ui.Calendar, wr.View);


ui.Calendar.prototype.create = function() {
  this.node = wr.div_c("ui_calendar");
};
