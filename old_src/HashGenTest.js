
HashGenTest = TestCase("HashGenTest");

HashGenTest.prototype.testCreate = function() {
  var gen = new wr.HashGen();
  var hash = gen.create();
  assertString(hash);
  assertTrue(hash.length > 0);
  assertNotEquals(gen.create(), gen.create());
};
