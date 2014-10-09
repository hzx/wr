
var ui = {};

ui.create = function(cl, params) {
  var control = new cl();
  for (var name in params) {
    control[name] = params[name];
  }
  control.create();
  return control;
};
