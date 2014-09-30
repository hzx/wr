
DomTest = TestCase("DomTest");

DomTest.prototype.testAttachElementObj = function() {
  var element = wr.createElement(wr.DIV);
  var obj = { someMethod: function() {} };
  assertUndefined(element.obj);
  element.obj = obj;
  assertNotUndefined(element.obj);
  assertFunction(element.obj.someMethod);
};


DomTest.prototype.testAddClass = function() {
  assertFunction(wr.addClass);
};


DomTest.prototype.testRemoveClass = function() {
  assertFunction(wr.removeClass);
};
