
EventsTest = TestCase("events_test");

EventsTest.prototype.testOn = function() {
  assertFunction(wr.on);
};

EventsTest.prototype.testOff = function() {
  assertFunction(wr.off);
};
