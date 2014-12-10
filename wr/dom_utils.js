
// bunch - array of [node, name, handler]
wr.listenBunch = function(bunch) {
  var params;
  for (var i = 0, length = bunch.length; i < length; ++i) {
    params = bunch[i];
    wr.listen(params[0], params[1], params[2]);
  }
};


wr.unlistenBunch = function(bunch) {
  var params;
  for (var i = 0, length = bunch.length; i < length; ++i) {
    params = bunch[i];
    wr.unlisten(params[0], params[1], params[2]);
  }
};


wr.div_c = function(className) {
  var node = wr.createElement(wr.DIV);
  wr.addClass(node, className);
  return node;
};


wr.div_cc = function(className, childs) {
  var node = wr.div_c(className);
  for (var i = 0, length = childs.length; i < length; ++i) {
    wr.appendChild(node, childs[i]);
  }
  return node;
};


wr.div_ct = function(className, text) {
  var node = wr.div_c(className);
  wr.appendChild(node, wr.createText(text));
  return node;
};


wr.span_c = function(className) {
  var node = wr.createElement(wr.SPAN);
  wr.addClass(node, className);
  return node;
};


wr.span_ct = function(className, text) {
  var node = wr.span_c(className);
  wr.appendChild(node, wr.createText(text));
  return node;
};


wr.input_c = function(className) {
  var node = wr.createElement("input");
  wr.addClass(node, className);
  return node;
};
