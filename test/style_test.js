
var StyleTest = TestCase("StyleTest");


StyleTest.prototype.setUp = function() {
  wr.init();
  this.some = wr.DIV_c("some");
  wr.appendChild(document.body, this.some);
};


StyleTest.prototype.tearDown = function() {
  wr.removeChild(document.body, this.some);
};


StyleTest.prototype.testGetStyle = function() {
  var expected = "block";

  assertEquals(expected, wr.getStyle(this.some, "display"));
};


StyleTest.prototype.testSetStyle = function() {
  var expected = "none";

  assertEquals("block", wr.getStyle(this.some, "display"));

  wr.setStyle(this.some, "display", expected);
  assertEquals(expected, wr.getStyle(this.some, "display"));
};
