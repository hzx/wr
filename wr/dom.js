
wr.DIV = "div";
wr.SPAN = "span";
wr.A = "a";
wr.TABLE = "table";
wr.TH = "th";
wr.TR = "tr";
wr.TD = "td";

wr.createElement = function(name) {
  return wr.global.document.createElement(name);
};

wr.createText = function(text) {
  return wr.global.document.createTextNode(text);
};

wr.createElementText = function(name, text) {
  var element = wr.createElement(name);
  element.appendChild(wr.createText(text));
  return element;
};

wr.setText = function() {
  // return wr.global.addEventListener ? function(node, text) {
  //   node.textContent = text;
  // } : function(node, text) {
  //   node.nodeValue = text;
  // };
};

wr.initQueue_.push(function() {
  if ("textContent" in document.body) {
    wr.setText = function(element, text) {
      element.textContent = text;
    };

    wr.getText = function(element) {
      return element.textContent;
    };
  } else {
    wr.setText = function(element, text) {
      if (element.firstChild) {
        element.firstChild.nodeValue = text;
      } else {
        wr.appendChild(element, wr.createText(text));
      }
    };

    wr.getText = function(element) {
      if (element.firstChild) {
        return element.firstChild.nodeValue;
      } else {
        return "";
      }
    };
  }
});


wr.getText = (function() {
  // return wr.global.addEventListener ? function(node) {
  //   return node.textContent;
  // } : function(node) {
  //   return node.nodeValue;
  // };
})();


wr.appendChild = function(node, child) {
  node.appendChild(child);
};


wr.removeChild = function(node, child) {
  node.removeChild(child);
};


wr.emptyChilds = function(node) {
  var cursor = node.firstChild;
  var current;
  while (cursor !== null) {
    current = cursor;
    cursor = cursor.nextSibling;
    wr.removeChild(node, current);
  }
};


wr.setClass = function(node, cn) {
  node.className = cn;
};


wr.mapToKeysString = function(mp) {
  var buf = [];
  for (var i in mp) {
    buf.push(i);
  }
  return buf.join(" ");
};


wr.addClass = (function() {
  return wr.global.DOMTokenList ? function(node, name) {
    node.classList.add(name);
  } : function(node, name) {
    if (!node.cn) {
      node.cn = {};
    }
    node.cn[name] = null;
    node.className = wr.mapToKeysString(node.cn);
  };
})();


wr.removeClass = (function() {
  return wr.global.DOMTokenList ? function(node, name) {
    node.classList.remove(name);
  } : function(node, name) {
    if (node.cn && (name in node.cn)) {
      delete node.cn[name];
      node.className = wr.mapToKeysString(node.cn);
    }
  };
})();


wr.hasClass = (function() {
  return wr.global.DOMTokenList ? function(node, name) {
    return node.classList.contains(name);
  } : function(node, name) {
    return node.cn && name in node.cn;
  };
})();


wr.addJs = function(content) {
  var node = wr.createElement("script");
  node.type = "text/javascript";
  node.text = content;
  wr.appendChild(wr.global.document.getElementsByTagName("head")[0], node);
};


wr.addCss = function(content) {
  var node = wr.createElement("style");
  node.type = "text/css";
  if (node.styleSheet) {
    node.styleSheet.cssText = content;
  } else {
    wr.appendChild(node, wr.createText(content));
  }
  wr.appendChild(wr.global.document.getElementsByTagName("head")[0], node);
};
