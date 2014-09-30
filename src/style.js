
wr.getStyle = function(elem, name) {
};

wr.initQueue_.push(function() {
  var element = document.body;

  // not needed?! test benchmark this and other 2 methods
  // wr.getStyle = function(elem, name) {
  //   elem.style[name];
  // };

  // IE
  if (element.currentStyle) {
    wr.getStyle = function(elem, name) {
      return elem.currentStyle[name];
    };
    return;
  }

  // W3C
  if (document.defaultView && document.defaultView.getComputedStyle) {
    wr.getStyle = function(elem, name) {
      var s = document.defaultView.getComputedStyle(elem, "");
      return s && s.getPropertyValue(name);
    };
    return;
  }
});


wr.setStyle = function(elem, name, value) {
  elem.style[name] = value;
};


// elem position relative page
wr.pageX = function(elem) {
  return elem.offsetParent ?
    elem.offsetLeft + wr.pageX(elem.offsetParent) :
    elem.offsetLeft;
};


wr.pageY = function(elem) {
  return elem.offsetParent ?
    elem.offsetTop + wr.pageY(elem.offsetParent) :
    elem.offsetTop;
};


// elem x position relative parent
wr.parentX = function(elem) {
  // if the offsetParent is the element parent, break early
  return elem.parentNode == elem.offsetParent ?
    elem.offsetLeft :
    // otherwise, we need to find the position relative to the entire
    // page for both elements, and find the difference;
    wr.pageX(elem) - wr.pageX(elem.parentNode);
};


wr.parentY = function(elem) {
  return elem.parentNode == elem.offsetParent ?
    elem.offsetTop :
    wr.pageY(elem) - wr.pageY(elem.parentNode);
};


wr.posX = function(elem) {
  return parseInt(wr.getStyle(elem, "left"));
};


wr.posY = function(elem) {
  return parseInt(wr.getStyle(elem, "top"));
};


wr.setX = function(elem, pos) {
  elem.style.left = pos + "px";
};


wr.setY = function(elem, pos) {
  elem.style.top = pos + "px";
};


wr.addX = function(elem, pos) {
  wr.setX(elem, wr.posX(elem) + pos);
};


wr.addY = function(elem, pos) {
  wr.setY(elem, wr.posY(elem) + pos);
};


wr.getWidth = function(elem) {
  return parseInt(wr.getStyle(elem, "width"));
}


wr.getHeight = function(elem) {
  return parseInt(wr.getStyle(elem, "height"));
};


wr.hide = function(elem) {
  var display = wr.getStyle(elem, "display");

  if (display != "none") elem.oldDisplay = display;

  elem.style.display = "none";
};


wr.show = function(elem) {
  elem.style.display = elem.oldDisplay || '';
};


// level 0-1.0
wr.setOpacity = function(elem, level) {
};

wr.initQueue_.push(function() {
  var element = document.body;

  // IE
  if (element.filters) {
    wr.setOpacity = function(elem, level) {
      elem.style.filter = "alpha(opacity=" + Math.floor(level * 100.0) + ")";
    };
    return;
  }

  // W3C
  wr.setOpacity = function(elem, level) {
    elem.style.opacity = level;
  };
});


wr.resetCss = function(elem, props) {
  var bak = {};

  for (var i in props) {
    bak[i] = elem.style[i];
    elem.style[i] = props[i];
  }

  return bak;
};


wr.setCss = function(elem, props) {
  for (var i in props) {
    elem.style[i] = props[i];
  }
};


// Find the full, possible, width of an element (not the actual,
// current, width)
wr.fullWidth = function(elem) {
  if (wr.getStyle(elem, "display") != "none") {
    return elem.offsetWidth || wr.getWidth(elem);
  }

  var bak = wr.resetCss(elem, {
    "display": "",
    "visibility": "hidden",
    "position": "absolute"
  });

  var width = elem.clientWidth || wr.getWidth(elem);

  wr.setCss(elem, bak);

  return width;
};


wr.fullHeight = function(elem) {
  if (wr.getStyle(elem, "display") != "none") {
    return elem.offsetHeight || wr.getHeight(elem);
  }

  var bak = wr.resetCss(elem, {
    "display": "",
    "visibility": "hidden",
    "position": "absolute"
  });

  var height = elem.clientHeight || wr.getHeight(elem);

  wr.setCss(elem, bak);

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


wr.pageHeight = function(elem) {
  return elem.scrollHeight;
};

wr.pageWidth = function(elem) {
  return elem.scrollWidth;
};


// A function for determining how far horizontally the browser (elem)
// is scrolled;
wr.scrollX = function(elem) {
  // return elem.scrollLeft;
  return elem.pageXOffset || elem.scrollLeft;
};

wr.scrollY = function(elem) {
  // return elem.scrollTop;
  return elem.pageYOffset || elem.scrollTop;
};

// wr.initQueue_.push(function() {
//   wr.scrollX = wr.global.addEventListener ? function(elem) { // W3C
//     return elem.scrollLeft;
//   } : function(elem) { // IE
//     return elem.pageXOffset;
//   };

//   wr.scrollY = wr.global.addEventListener ? function(elem) { // W3C
//     return elem.scrollTop;
//   } : function(elem) { // IE
//     return elem.pageYOffset;
//   };
// });


wr.scrollTo = function(elem, x, y) {
  elem.scrollTo(x, y);
};
