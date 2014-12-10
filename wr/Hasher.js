
wr.Hasher = function() {
  this.last = null;
  this.increment = 0;
};

wr.Hasher.MAX_NUM = 1000000;


wr.Hasher.prototype.generate = function() {
  this.increment =
    this.increment > wr.Hasher.MAX_NUM ? 0 : this.increment + 1;
  return (new Date()).getTime().toString(16) + "-" +
    this.increment.toString(16);
};


wr.hasher = new wr.Hasher();
wr.hash = function() {
  return wr.hasher.generate();
};
