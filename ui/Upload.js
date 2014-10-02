
ui.Upload = function() {
  wr.construct(ui.Upload, this);

  // user data to fill
  this.userClass = "";
  this.multiple = false;

  this.eventChange = new wr.Event();
};


wr.inherit(ui.Upload, wr.View);


ui.Upload.create = function() {
  this.input = wr.INPUT_c("ui_upload_input");
  this.input.type = "file";
  this.input.multiple = this.multiple;

  this.node = wr.DIV_cc("ui_upload", [
    this.input
  ]);

  wr.addClass(this.node, this.userClass);

  this.events = [
    [this.node, "click", wr.bind(this, this.onClick)],
    [this.input, "change", wr.bind(this, this.onInputChange)]
  ];
};


// reset selected files
ui.Upload.prototype.reset = function() {
  // replace input
  var input = wr.INPUT_c("ui_upload_input");
  input.type = "file";
  input.multiple = this.multiple;

  var isEnter = this.isEnter;

  if (isEnter) {
    this.exit();
  }

  wr.removeChild(this.node, this.input);
  this.input = input;
  wr.appendChild(this.node, input);

  if (isEnter) {
    this.enter();
  }
};


ui.Upload.prototype.onClick = function(e) {
  wr.click(this.input);
};


ui.Upload.prototype.onInputChange = function(e) {
  e.stopPropagation();
  this.eventChange.notify(e);
};
