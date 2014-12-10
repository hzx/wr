
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


wr.clone = function(obj) {
  var c = {};
  wr.augment(c, obj);
  return c;
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


wr.addViewSingleton = function(cl) {
  cl.instance_ = null;
  cl.getInstance = function() {
    if (!cl.instance_) {
      cl.instance_ = new cl();
      cl.instance_.create();
    }
    return cl.instance_;
  };
}


wr.initQueue_ = [];


wr.init = function() {
  for (var i = 0, length = wr.initQueue_.length; i < length; ++i) {
    wr.initQueue_[i]();
  }
};


wr.dummy = function() {};

wr.dummyTrue = function() {
  return true;
};

wr.dummyFalse = function() {
  return false;
};


wr.DELIM_ROW = "\1";
wr.DELIM_FIELD = "\2";
