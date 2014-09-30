
ButtonTest = TestCase("ButtonTest");

ButtonTest.prototype.testCreate = function() {
  var styleNormal = {
    "cursor": "pointer",
    "backgroundColor": "#f7f7f7"
  };
  var styleHover = {
    "backgroundColor": "#f0f0f0"
  };
  var styleSelect = {
    "cursor": "default",
    "backgroundColor": "#a0a0a0"
  };
  var button = new wr.Button(styleNormal, styleHover, styleSelect);
  button.create();
  assertEquals(styleNormal["cursor"], button.node.style["cursor"]);
  wr.augment(button.node.style, styleHover);
  assertEquals(styleNormal["cursor"], button.node.style["cursor"]);
  wr.augment(button.node.style, styleSelect);
  assertEquals(styleSelect["cursor"], button.node.style["cursor"]);
  // assertEquals(styleNormal["backgroundColor"], button.node.style["backgroundColor"]);
};
