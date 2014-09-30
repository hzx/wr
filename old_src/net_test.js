
NetTest = TestCase("net_test");

NetTest.prototype.testCreateXhr = function() {
  assertFunction(wr.createXhr);
};

NetTest.prototype.testGet = function() {
  var sender = new wr.Sender();
};

NetTest.prototype.testPost = function() {
  var sender = new wr.Sender();
};
