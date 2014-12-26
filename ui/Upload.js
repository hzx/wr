
ui.Upload = function() {
  ui.Upload.base.constructor.call(this);

  // user data to fill
  this.userClass = "";
  this.userText = "";
  this.multiple = false;

  this.isOpen = false;

  this.eventChange = new wr.Event();
  this.meInputChange = wr.bind(this, this.onInputChange);
  this.meInputFocus = wr.bind(this, this.onInputFocus);
  this.meInputBlur = wr.bind(this, this.onInputBlur);
};
wr.inherit(ui.Upload, wr.View);


ui.Upload.prototype.create = function() {
  this.input = wr.input_c("ui_upload_input");
  this.input.type = "file";
  this.input.multiple = this.multiple;

  this.text = wr.span_ct("ui_upload_text", this.userText);

  this.node = wr.div_cc("ui_upload", [
    this.text,
    this.input
  ]);

  wr.addClass(this.node, this.userClass);

  this.events = [
    [this.node, "click", wr.bind(this, this.onClick)]
  ];
};


ui.Upload.prototype.enter = function() {
  ui.Upload.base.enter.call(this);

  wr.listen(this.input, "change", this.meInputChange);
  wr.listen(this.input, "focus", this.meInputFocus);
  wr.listen(this.input, "blur", this.meInputBlur);
};


ui.Upload.prototype.exit = function() {
  ui.Upload.base.exit.call(this);

  wr.unlisten(this.input, "change", this.meInputChange);
  wr.unlisten(this.input, "focus", this.meInputFocus);
  wr.unlisten(this.input, "blur", this.meInputBlur);
};


// reset selected files
ui.Upload.prototype.reset = function() {
  // replace input
  var input = wr.input_c("ui_upload_input");
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


ui.Upload.prototype.setText = function(text) {
  wr.setText(this.text, text);
};


ui.Upload.prototype.onClick = function(e) {
  if(this.isOpen) return;
  this.isOpen = true;
  wr.click(this.input);
  this.isOpen = false;
};


ui.Upload.prototype.onInputChange = function(e) {
  e.stopPropagation();

  var files = e.target.files;

  if (files && files.length > 0) {
    this.eventChange.notify(files);
  }
};


ui.Upload.prototype.onInputFocus = function(e) {
  // wr.log("Upload.focus");
};


ui.Upload.prototype.onInputBlur = function(e) {
  // wr.log("Upload blur");
};
