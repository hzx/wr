

wr.trimString = function(value) {
  return value.replace(/^\s+|\s+$/g, "")
};


wr.equalArrays = function(a, b) {
  if ("length" in a && "length" in b &&
      a.length === b.length) {
    for (var i = 0, n = a.length; i < n; ++i) {
      if (a[i] === b[i]) {
        continue;
      }
      return false;
    }
    return true;
  }
  return false;
};
