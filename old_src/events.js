
wr.stopPropagationIE_ = function() {
  this.cancelBubble = true;
};

wr.preventDefaultIE_ = function() {
  this.returnValue = false;
};

wr.on = (function() {
  return wr.global.addEventListener ? function(node, name, handler) {
    node.addEventListener(name, handler, false);
  } : function(node, name, handler) {
    // create proxy handler
    handler.proxy = function() {
      // fix event
      wr.global.event.target = wr.global.event.srcElement;
      wr.global.event.stopPropagation = wr.stopPropagationIE_;
      wr.global.event.preventDefault = wr.preventDefaultIE_;
      // call handler W3C way - with event parameter
      return handler(wr.global.event);
    };
    node.attachEvent("on" + name, handler.proxy);
  };
})();


wr.off = (function() {
  return wr.global.removeEventListener ? function(node, name, handler) {
    node.removeEventListener(name, handler, false);
  } : function(node, name, handler) {
    node.detachEvent("on" + name, handler.proxy);
    delete handler.proxy;
  };
})();
