
ui.Calendar = function() {
  wr.construct(ui.Calendar, this);
};


wr.inherit(ui.Calendar, wr.View);


ui.Calendar.prototype.create = function() {
  this.node = wr.DIV_c("ui_calendar");
};
