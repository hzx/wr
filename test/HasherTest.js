
var HasherTest = TestCase("HasherTest");


HasherTest.prototype.setUp = function() {
  this.hasher = new wr.Hasher();
};


HasherTest.prototype.tearDown = function() {
  delete this.hasher;
};


HasherTest.prototype.testGenerate = function() {
  assertString(this.hasher.generate());
  assertTrue(this.hasher.generate().length > 0);
  assertNotEquals(this.hasher.generate(), this.hasher.generate());
};
