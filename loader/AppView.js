loader.AppView = function() {
  loader.AppView.base.constructor.call(this);
};
wr.inherit(loader.AppView, wr.View);


loader.AppView.prototype.create = function() {
  this.logo = wr.div_c("loader_logo");
  this.errors = wr.div_c("loader_errors");

  this.node = wr.div_cc("loader", [
    this.logo,
    this.errors
  ]);

  wr.hide(this.errors);
};


loader.AppView.prototype.showError = function(msg) {
  wr.appendChild(this.errors, wr.div_ct("loader_error", msg));

  wr.hide(this.logo);
  wr.show(this.errors);
};
