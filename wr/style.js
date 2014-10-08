
wr.getStyle = function(element, name) {
};

wr.initQueue_.push(function() {
  var foo = document.body;

  // not needed?! test benchmark this and other 2 methods
  // wr.getStyle = function(element, name) {
  //   element.style[name];
  // };

  // IE
  if (foo.currentStyle) {
    wr.getStyle = function(element, name) {
      return element.currentStyle[name];
    };
    return;
  }

  // W3C
  if (document.defaultView && document.defaultView.getComputedStyle) {
    wr.getStyle = function(element, name) {
      var s = document.defaultView.getComputedStyle(element, "");
      return s && s.getPropertyValue(name);
    };
    return;
  }
});


wr.setStyle = function(element, name, value) {
  element.style[name] = value;
};


// element position relative page
wr.pageX = function(element) {
  return element.offsetParent ?
    element.offsetLeft + wr.pageX(element.offsetParent) :
    element.offsetLeft;
};


wr.pageY = function(element) {
  return element.offsetParent ?
    element.offsetTop + wr.pageY(element.offsetParent) :
    element.offsetTop;
};


// element x position relative parent
wr.parentX = function(element) {
  // if the offsetParent is the element parent, break early
  return element.parentNode == element.offsetParent ?
    element.offsetLeft :
    // otherwise, we need to find the position relative to the entire
    // page for both elements, and find the difference;
    wr.pageX(element) - wr.pageX(element.parentNode);
};


wr.parentY = function(element) {
  return element.parentNode == element.offsetParent ?
    element.offsetTop :
    wr.pageY(element) - wr.pageY(element.parentNode);
};


wr.posX = function(element) {
  return parseInt(wr.getStyle(element, "left"));
};


wr.posY = function(element) {
  return parseInt(wr.getStyle(element, "top"));
};


wr.setX = function(element, pos) {
  element.style.left = pos + "px";
};


wr.setY = function(element, pos) {
  element.style.top = pos + "px";
};


wr.addX = function(element, pos) {
  wr.setX(element, wr.posX(element) + pos);
};


wr.addY = function(element, pos) {
  wr.setY(element, wr.posY(element) + pos);
};


wr.getWidth = function(element) {
  return parseInt(wr.getStyle(element, "width"));
}


wr.getHeight = function(element) {
  return parseInt(wr.getStyle(element, "height"));
};


wr.hide = function(element) {
  var display = wr.getStyle(element, "display");

  if (display != "none") element.oldDisplay = display;

  element.style.display = "none";
};


wr.show = function(element) {
  element.style.display = element.oldDisplay || '';
};


// level 0-1.0
wr.setOpacity = function(element, level) {
};

wr.initQueue_.push(function() {
  var element = document.body;

  // IE
  if (element.filters) {
    wr.setOpacity = function(element, level) {
      element.style.filter = "alpha(opacity=" + Math.floor(level * 100.0) + ")";
    };
    return;
  }

  // W3C
  wr.setOpacity = function(element, level) {
    element.style.opacity = level;
  };
});


wr.resetCss = function(element, props) {
  var bak = {};

  for (var i in props) {
    bak[i] = element.style[i];
    element.style[i] = props[i];
  }

  return bak;
};


wr.setCss = function(element, props) {
  for (var i in props) {
    element.style[i] = props[i];
  }
};


// Find the full, possible, width of an element (not the actual,
// current, width)
wr.fullWidth = function(element) {
  if (wr.getStyle(element, "display") != "none") {
    return element.offsetWidth || wr.getWidth(element);
  }

  var bak = wr.resetCss(element, {
    "display": "",
    "visibility": "hidden",
    "position": "absolute"
  });

  var width = element.clientWidth || wr.getWidth(element);

  wr.setCss(element, bak);

  return width;
};


wr.fullHeight = function(element) {
  if (wr.getStyle(element, "display") != "none") {
    return element.offsetHeight || wr.getHeight(element);
  }

  var bak = wr.resetCss(element, {
    "display": "",
    "visibility": "hidden",
    "position": "absolute"
  });

  var height = element.clientHeight || wr.getHeight(element);

  wr.setCss(element, bak);

  return height;
};


wr.getX = function(e) {
};

wr.getY = function(e) {
};

// get the x position of the mouse relative to the element target
// used in event object
wr.getElementX = function(e) {
};

wr.getElementY = function(e) {
};

wr.initQueue_.push(function() {
  wr.getX = wr.global.addEventListener ? function(e) { // W3C
    return e.pageX;
  } : function(e) { // IE
    return e.clientX + document.body.scrollLeft;
  };

  wr.getY = wr.global.addEventListener ? function(e) { // W3C
    return pageY;
  } : function(e) { // IE
    return e.clientY + document.body.scrollTop;
  };

  wr.getElementX = wr.global.addEventListener ? function(e) { // W3C
    return e.layerX;
  } : function(e) { // IE
    return e.offsetX;
  };

  wr.getElementY = wr.global.addEventListener ? function(e) { // W3C
    return e.layerY;
  }: function(e) { // IE
    return e.offsetY;
  };
});


wr.pageHeight = function(element) {
  return element.scrollHeight;
};

wr.pageWidth = function(element) {
  return element.scrollWidth;
};


// A function for determining how far horizontally the browser (element)
// is scrolled;
wr.scrollX = function(element) {
  // return element.scrollLeft;
  return element.pageXOffset || element.scrollLeft;
};

wr.scrollY = function(element) {
  // return element.scrollTop;
  return element.pageYOffset || element.scrollTop;
};

// wr.initQueue_.push(function() {
//   wr.scrollX = wr.global.addEventListener ? function(element) { // W3C
//     return element.scrollLeft;
//   } : function(element) { // IE
//     return element.pageXOffset;
//   };

//   wr.scrollY = wr.global.addEventListener ? function(element) { // W3C
//     return element.scrollTop;
//   } : function(element) { // IE
//     return element.pageYOffset;
//   };
// });


wr.scrollTo = function(element, x, y) {
  element.scrollTo(x, y);
};
