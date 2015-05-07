
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


wr.tag = function(name, events, props, value, childs) {
  // var el = wr.createElement(name);
  var tag = new Tag(name);
  
  if (events) {
    tag.events = events;
  }

  if (props) {
  }

  if (value) {
    tag.setValue(value);
  }

  if (childs) {
    for (var i = 0, length = childs.length; i < length; ++i)
      tag.append
  }

  return tag;
};


wr.view = function(clas, events, props, childs) {
  var view = new clas();

  // TODO: refactor work with events
  if (events) view.addEvents(events);

  if (props) 
    for (var i = 0, length = props.length; i < length; i+=2)
      view[props[i]] = props[i+1];

  view.element = view.create();

  if (childs)
    for (var i = 0, length = childs.length; i < length; ++i)
      view.append(childs[i]);


  return view;
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
