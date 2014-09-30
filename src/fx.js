
// smooth show with size
wr.slideIn = function(elem, time, callback) {
  var height = wr.fullHeight(elem);
  elem.style.height = "0px";
  wr.show(elem);

  wr.animate(function(value) { // update
    elem.style.height = parseInt(value) + "px";
  }, callback, time, wr.updateDt, 0, height, wr.easingEaseIn);
};


// smooth hide with size
wr.slideDown = function(elem, time, callback) {
  wr.animate(function(value) {
    elem.style.height = parseInt(value) + "px";
  }, callback, time, wr.updateDt, wr.getHeight(elem), 0, wr.easingEaseOut);
};


// smooth show with opacity
wr.fadeIn = function(elem, time, callback) {
  wr.setOpacity(elem, 0.0);
  wr.show(elem);

  wr.animate(function(value) {
    wr.setOpacity(elem, value);
  }, callback, time, wr.updateDt, 0.0, 1.0, wr.easingEaseIn);
};


// smooth hide with opacity
wr.fadeOut = function(elem, time, callback) {
  wr.setOpacity(elem, 1.0);
  wr.show(elem);

  wr.animate(function(value) { // update
    wr.setOpacity(elem, value);
  }, callback, time, wr.updateDt, 1.0, 0.0, wr.easingEaseOut);
};


wr.slideFadeIn = function(elem, time, callback) {
  var height = wr.fullHeight(elem);
  elem.style["height"] = "0px";
  wr.setOpacity(elem, 0.0);

  wr.animate(function(value) {
    elem.style.height = parseInt(height * value) + "px";
    wr.setOpacity(elem, value);
  }, callback, time, wr.updateDt, 0.0, 1.0, wr.easingEaseIn);
};


wr.slideFadeOut = function(elem, time, callback) {
  var height = wr.getHeight(elem);

  wr.animate(function(value) {
    elem.style.height = parseInt(height * value) + "px";
    wr.setOpacity(elem, value);
  }, callback, time, wr.updateDt, 1.0, 0.0, wr.easingEaseOut);
};
