
wr.Button = function(styleNormal, styleHover, styleSelect) {
  this.styleNormal = styleNormal;
  this.styleHover = styleHover;
  this.styleSelect = styleSelect;

  // set this by parent
  this.clickCallback = null;

  this.isSelect = false;

  // bind events
  this.meMouseover = wr.bind(this, this.onMouseover);
  this.meMouseout = wr.bind(this, this.onMouseout);
  this.meClick = wr.bind(this, this.onClick);
};
wr.inherits(wr.Button, wr.Control);

wr.Button.prototype.create = function() {
  this.node = wr.DS(this.styleNormal);
  this.events = [
    [this.node, "mouseover", this.meMouseover],
    [this.node, "mouseout", this.meMouseout],
    [this.node, "click", this.meClick]
  ];
};

wr.Button.prototype.setSelected = function(state) {
  this.isSelect = state;
  if (this.isSelect) {
    wr.augment(this.node.style, this.styleSelect);
  } {
    wr.augment(this.node.style, this.styleNormal);
  }
};

wr.Button.prototype.onMouseover = function(e) {
  if (!this.isSelect) {
    wr.augment(this.node.style, this.styleHover);
  }
};

wr.Button.prototype.onMouseout = function(e) {
  if (!this.isSelect) {
    wr.augment(this.node.style, this.styleNormal);
  }
};

wr.Button.prototype.onClick = function(e) {
  // this line for test
  wr.augment(this.node.style, this.styleSelect);

  if (this.clickCallback) {
    this.clickCallback(this);
  }
  e.stopPropagation();
  e.preventDefault();
  return false;
};
