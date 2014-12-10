
ui.Slider = function() {
  wr.construct(ui.Slider, this);
};


wr.inherit(ui.Slider, wr.View);


ui.Slider.prototype.create = function() {
  this.slides = wr.div_c("ui_slider_slides");
  this.nextButton = wr.div_c("ui_slider_next");
  this.prevButton = wr.div_c("ui_slider_prev");

  this.node = wr.div_cc("ui_slider", [
    this.slides,
    this.nextButton,
    this.prevButton
  ]);

  this.events = [
  ];
};


ui.Slider.prototype.next = function() {
};


ui.Slider.prototype.prev = function() {
};


ui.Slider.prototype.start = function() {
};


ui.Slider.prototype.stop = function() {
};


ui.Slider.prototype.onNextClick = function(e) {
};


ui.Slider.prototype.onPrevClick = function(e) {
};
