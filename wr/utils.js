

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


wr.stringStartsWith = function(text, part) {
  if (part.length > text.length) {
    return false;
  }

  for (var i = 0, length = part.length; i < length; ++i) {
    if (part.charAt(i) !== text.charAt(i)) {
      return false;
    }
  }

  return true;
};


wr.isEmpty = function(obj) {
  for (var name in obj) {
    return false;
  }

  return true;
};
