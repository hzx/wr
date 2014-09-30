
var DatetimeTest = TestCase("DatetimeTest");


DatetimeTest.prototype.testStrftime = function() {
  var date = new Date(2009, 11, 5, 3, 7, 8);

  assertEquals("2009", wr.strftime(date, "%Y"));
  assertEquals("12", wr.strftime(date, "%m"));
  assertEquals("05", wr.strftime(date, "%d"));
  assertEquals("03", wr.strftime(date, "%H"));
  assertEquals("07", wr.strftime(date, "%M"));
  assertEquals("08", wr.strftime(date, "%S"));
  assertEquals("2009-12-05", wr.strftime(date, "%F"));
  assertEquals("2009-12-05 03:07:08", wr.strftime(date, "%L"));
};


// Parse date from string
// Month parsed as usual 1 based, and become zero bazed
DatetimeTest.prototype.testDateStr = function() {
  var str = "2010-12-17 04:08:12";
  var date = wr.parseTimeL(str);

  assertNotUndefined(date);
  assertNotNull(date);
  assertEquals(2010, date.getFullYear());
  assertEquals(11, date.getMonth());
  assertEquals(17, date.getDate());
  assertEquals(4, date.getHours());
  assertEquals(8, date.getMinutes());
  assertEquals(12, date.getSeconds());
};
