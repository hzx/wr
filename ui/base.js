
var ui = {};

ui.create = function(cl, params) {
  var control = new cl();
  for (var name in params) {
    control[name] = params[name];
  }
  control.create();
  return control;
};

ui.widget = function(cl, coll, params) {
  var w = new cl(coll);
  for (var name in params) {
    w[name] = params[name];
  }
  w.create();
  return w;
};
