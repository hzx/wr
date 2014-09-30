
LoaderTest = TestCase("LoaderTest");

LoaderTest.prototype.testCreate = function() {
  var instance = wr.Loader.getInstance();
  assertNotNull(instance);
  assertNotUndefined(instance);
};
