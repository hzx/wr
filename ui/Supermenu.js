
ui.Supermenu = function() {
  // ui.Supermenu.base.constructor.call(this);
  wr.construct(ui.Supermenu, this);
};


wr.inherit(ui.Supermenu, wr.View);


ui.Supermenu.prototype.create = function() {
  this.node = wr.div_cc("ui_supermenu", []);
};


ui.Supermenu.prototype.enter = function() {
  ui.Supermenu.base.enter.call(this);
};


ui.Supermenu.prototype.exit = function() {
  ui.Supermenu.base.exit.call(this);
};
