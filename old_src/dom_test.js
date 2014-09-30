
DomTest = TestCase("dom_test");

DomTest.prototype.testCreateElement = function() {
  var element = wr.createElement("div");
  assertNotUndefined(element);
  assertNotNull(element);
};

DomTest.prototype.testCreateText = function() {
  var node = wr.createText("hello1");
  assertEquals("hello1", wr.getText(node));
};

DomTest.prototype.testSetText = function() {
  var node = wr.createText("hello2");
  assertEquals("hello2", wr.getText(node));
  wr.setText(node, "hello3");
  assertEquals("hello3", wr.getText(node));
};
