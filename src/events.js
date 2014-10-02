
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
        return handler(wr.fixEventIE_(e || wr.global.event));
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


wr.click = wr.dummy;


wr.initQueue_.push(function() {
  var foo = document.body;

  // firefox
  if (foo.click) {
    wr.click = function(element) {
      element.click();
    };
    return;
  }

  // W3C 
  if(document.createEvent) {
    wr.click = function(element) {
      event = document.createEvent("MouseEvents");
      event.initMouseEvent("click", true, true, wr.global,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
      element.dispatchEvent(event);
    };
  } else { // IE
    wr.click = function(element) {
      element.fireEvent("onclick", element.ownerDocument.createEventObject());
    }
  }
});
