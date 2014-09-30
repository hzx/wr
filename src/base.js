
var wr = {};
wr.global = this;


wr.inherit = function(child, base) {
  var tmp = function() {};
  tmp.prototype = base.prototype;
  child.prototype = new tmp();
  child.prototype.constructor = child;
  child.base = base.prototype;
};


wr.augment = function(dest, src) {
  for (var i in src) {
    dest[i] = src[i];
  }
};


wr.bind = function(context, func) {
  return function() {
    return func.apply(context, arguments);
  };
};


wr.addSingleton = function(cl) {
  cl.instance_ = null;
  cl.getInstance = function() {
    if (cl.instance_ === null) {
      cl.instance_ = new cl();
    }
    return cl.instance_;
  };
};


wr.initQueue_ = [];


wr.init = function() {
  for (var i = 0, length = wr.initQueue_.length; i < length; ++i) {
    wr.initQueue_[i]();
  }
};
