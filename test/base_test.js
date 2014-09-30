
var BaseTest = TestCase("BaseTest");


BaseTest.prototype.testInherit = function() {
  // create simple base class
  var base = function() {
    this.a = "a1";
  };
  base.prototype.method1 = function() {};

  // create simple child class
  var child = function() {
    child.base.constructor.call(this);
    this.b = "b1";
  };
  wr.inherit(child, base);
  child.prototype.method2 = function() {};

  var obj = new child();

  assertEquals(base.prototype, child.base);
  assertEquals(child, child.prototype.constructor);
  assertEquals("a1", obj.a);
  assertEquals("b1", obj.b);
  assertFunction(obj.method1);
  assertFunction(obj.method2);
};


BaseTest.prototype.testAugment = function() {
  var src = {
    "src1": "field1",
    "src2": "field2"
  };

  var dest = {
    "dest1": "field3"
  };

  wr.augment(dest, src);

  assertTrue("dest1" in dest);
  assertEquals(dest["dest1"], "field3");
  assertTrue("src1" in dest);
  assertEquals(src["src1"], "field1");
  assertTrue("src2" in dest);
  assertEquals(src["src2"], "field2");
};


BaseTest.prototype.testBind = function() {
  // create simple class
  var some = function() {
    this.val = "value1";
    this.meGetValue = wr.bind(this, this.getValue);
  };
  some.prototype.getValue = function() {
    return this.val;
  };

  var obj = new some();

  assertUndefined(obj.getValue.call(wr.global));
  assertEquals("value1", obj.meGetValue.call(wr.global));
};


BaseTest.prototype.testAddSingleton = function() {
  var some = function() {};

  wr.addSingleton(some);

  assertFunction(some.getInstance);
  assertNotUndefined(some.getInstance());
  assertNotNull(some.getInstance());
  assertEquals(some.getInstance(), some.getInstance());
};
