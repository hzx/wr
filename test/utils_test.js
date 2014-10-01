
var UtilsTest = TestCase("UtilsTest");


UtilsTest.prototype.testEqualArrays = function() {
  assertTrue(wr.equalArrays([], []));
  assertTrue(wr.equalArrays(["contact"], ["contact"]));
  assertFalse(wr.equalArrays(["board"], []));
};


UtilsTest.prototype.testStringStartsWith = function() {
  assertTrue(wr.stringStartsWith("стрекоза", "стр"));
  assertFalse(wr.stringStartsWith("Стрекоза", "стр"));
};


UtilsTest.prototype.testIsEmpty = function() {
  assertTrue(wr.isEmpty({}));
  assertFalse(wr.isEmpty({"foo": "test"}));
};
