
wr.Hasher = function() {
  var last = null;
  var increment = 0;
};


wr.Hasher.prototype.generate = function() {
  var hash = (new Date()).getTime().toString(16);

  if (hash === this.last) {
    ++this.increment;
    hash += "-" + this.increment.toString(16);
  } else {
    this.increment = 0;
  }

  this.last = hash;
  return hash;
};

wr.hasher = new wr.Hasher();

wr.hash = function() {
  return wr.hasher.generate();
};
