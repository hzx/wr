
wr.stopPropagationIE_ = function() {
  this.cancelBubble = true;
};


wr.preventDefaultIE_ = function() {
  this.returnValue = false;
};

wr.fixEventIE_ = function(e) {
  e.target = e.srcElement;
  e.stopPropagation = wr.stopPropagationIE_;
  e.preventDefault = wr.preventDefaultIE_;
  return e;
};


wr.listen = (function(node, name, handler) {
  return wr.global.addEventListener ? function(node, name, handler) {
    node.addEventListener(name, handler, false);
  } : function(node, name, handler) {
    // create proxy handler
    if (!!handler.proxy === false) {
      handler.proxy = function(e) {
        // call handler W3C way - with event parameter
        return handler(wr.fixEventIE_(e || window.event));
      };
    }
    node.attachEvent("on" + name, handler.proxy);
  };
})();


wr.unlisten = (function(node, name, handler) {
  return wr.global.removeEventListener ? function(node, name, handler) {
    node.removeEventListener(name, handler, false);
  } : function(node, name, handler) {
    node.detachEvent("on" + name, handler.proxy);
  };
})();
