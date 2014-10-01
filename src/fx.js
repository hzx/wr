
// smooth show with size
wr.slideIn = function(element, time, callback) {
  var height = wr.fullHeight(element);
  element.style.height = "0px";
  wr.show(element);

  wr.animate(function(value) { // update
    element.style.height = parseInt(value) + "px";
  }, callback, time, wr.updateDt, 0, height, wr.easingEaseIn);
};


// smooth hide with size
wr.slideDown = function(element, time, callback) {
  wr.animate(function(value) {
    element.style.height = parseInt(value) + "px";
  }, function() {
    wr.hide(element)
    callback();
  }, time, wr.updateDt, wr.getHeight(element), 0, wr.easingEaseOut);
};


// smooth show with opacity
wr.fadeIn = function(element, time, callback) {
  wr.setOpacity(element, 0.0);
  wr.show(element);

  wr.animate(function(value) {
    wr.setOpacity(element, value);
  }, callback, time, wr.updateDt, 0.0, 1.0, wr.easingEaseIn);
};


// smooth hide with opacity
wr.fadeOut = function(element, time, callback) {
  wr.setOpacity(element, 1.0);
  wr.show(element);

  wr.animate(function(value) { // update
    wr.setOpacity(element, value);
  }, function() {
    wr.hide(element);
    callback();
  }, time, wr.updateDt, 1.0, 0.0, wr.easingEaseOut);
};


wr.slideFadeIn = function(element, time, callback) {
  var height = wr.fullHeight(element);
  element.style["height"] = "0px";
  wr.setOpacity(element, 0.0);
  wr.show(element);

  wr.animate(function(value) {
    element.style.height = parseInt(height * value) + "px";
    wr.setOpacity(element, value);
  }, callback, time, wr.updateDt, 0.0, 1.0, wr.easingEaseIn);
};


wr.slideFadeOut = function(element, time, callback) {
  var height = wr.fullHeight(element);

  wr.animate(function(value) {
    element.style.height = parseInt(height * value) + "px";
    wr.setOpacity(element, value);
  }, function() {
    wr.hide(element);
    callback();
  }, time, wr.updateDt, 1.0, 0.0, wr.easingEaseOut);
};
