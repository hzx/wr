
EventsTest = TestCase("EventsTest");


EventsTest.prototype.testListen = function() {
  assertFunction(wr.listen);
};


EventsTest.prototype.testUnlisten = function() {
  assertFunction(wr.unlisten);
};
