
wr.createElement = function(name) {
  return wr.global.document.createElement(name);
};

wr.createText = function(text) {
  return wr.global.document.createTextNode(text);
};

wr.setText = (function() {
  return wr.global.addEventListener ? function(node, text) {
    node.textContent = text;
  } : function(node, text) {
    node.nodeValue = text;
  };
})();

wr.getText = (function() {
  return wr.global.addEventListener ? function(node) {
    return node.textContent;
  } : function(node) {
    return node.nodeValue;
  };
})();

// utility functions

wr.DS = function(style) {
  var d = wr.createElement("div");
  wr.augment(d.style, style);
  return d;
};

wr.appendChild = function(node, child) {
  node.appendChild(child);
};

wr.removeChild = function(node, child) {
  node.removeChild(child);
};

wr.appendChilds = function(node, childs) {
  var i, length;
  for (i = 0, length = childs.length; i < length; ++i) {
    wr.appendChild(node, childs[i]);
  }
};
