
var UtilsTest = TestCase("UtilsTest");


UtilsTest.prototype.testEqualArrays = function() {
  assertTrue(wr.equalArrays([], []));
  assertTrue(wr.equalArrays(["contact"], ["contact"]));
  assertFalse(wr.equalArrays(["board"], []));
};
