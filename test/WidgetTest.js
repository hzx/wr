
var WidgetTest = TestCase("WidgetTest");


WidgetTest.prototype.setUp = function() {
  this.coll = new wr.Collection(null);
  this.coll.append({1: 1, 2: "name 01"});
  this.coll.append({1: 2, 2: "name 02"});
};


WidgetTest.prototype.tearDown = function() {
  delete this.coll;
};
