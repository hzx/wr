
wr.KeySpline = function(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
};


wr.KeySpline.prototype.get = function(x) {
  return this.calcBezier(this.getTForX(x), this.y1, this.y2);
};


wr.KeySpline.prototype.a = function(a1, a2) {
  return 1.0 - 3.0 * a2 + 3.0 * a1;
};


wr.KeySpline.prototype.b = function(a1, a2) {
  return 3.0 * a2 - 6.0 * a1;
};


wr.KeySpline.prototype.c = function(a1) {
  return 3.0 * a1;
};


wr.KeySpline.prototype.calcBezier = function(t, a1, a2) {
  return ((this.a(a1, a2) * t + this.b(a1, a2)) * t + this.c(a1)) * t;
};


wr.KeySpline.prototype.getSlope = function(t, a1, a2) {
  return 3.0 * this.a(a2, a2) * t * t + 2.0 * this.b(a1, a2) * t + this.c(a1);
};


wr.KeySpline.prototype.getTForX = function(x) {
  // Newton raphson iteration
  var t = x;
  var currentSlope, currentX;
  for (var i = 0; i < 4; ++i) {
    currentSlope = this.getSlope(t, this.x1, this.x2);
    if (currentSlope == 0.0) return t;
    currentX = this.calcBezier(t, this.x1, this.x2) - x;
    t -= currentX / currentSlope;
  }
  return t;
};
