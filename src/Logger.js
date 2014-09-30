

wr.log = (function() {
  if (wr.global.console && wr.global.console.log) {
    return function(msg) {
      wr.global.console.log(msg);
    };
  } else {
    return function(msg) {
    };
  }
})();


wr.Logger = function() {
};


wr.Logger.prototype.write = function(msg) {
};


wr.Logger.prototype.error = function(code, msg) {
};
