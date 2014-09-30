// TODO: think about DEBUG, RELEASE, browser specific (at least W3C) flags
// to compile optimized library versions, do it after asmjs R&D
// TODO: read about closure-compiler ADVANCED_OPTIMIZATIONS, how to use flags

var wr = wr || {};
wr.global = this;

// TODO: log to div console for IE or console for W3C
wr.log = function(msg) {
  console.log(msg);
}

wr.inherits = function(child, base) {
  var tmp = function() {};
  tmp.prototype = base.prototype;
  child.base = base.prototype;
  child.prototype = new tmp();
  child.prototype.constructor = child;
};

wr.augment = function(dest, src) {
  var i;
  if (!dest || !src) {
    throw new Error("wr.aurgment: !dest || !src");
  }
  for (i in src) {
    dest[i] = src[i];
  }
};

wr.bind = function(scope, func) {
  return function() {
    return func.apply(scope, arguments);
  };
};

wr.addSingletonGetter = function(cl) {
  cl.instance_ = null;
  cl.getInstance = function() {
    if (cl.instance_ === null) {
      cl.instance_ = new cl();
    }
    return cl.instance_;
  };
};
