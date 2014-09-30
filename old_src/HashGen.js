
wr.HashGen = function() {
  this.counter = 0;
  this.last = null;
};

// TODO: create hash like mongodb objectid
wr.HashGen.prototype.create = function() {
  var hash = (new Date()).getTime().toString(16);

  if (hash === this.last) {
    ++this.counter;
    hash += "-" + this.counter.toString(16);
  } else {
    this.counter = 0;
  }

  this.last = hash;
  return hash;
};
