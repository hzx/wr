// base class for all applications

wr.App = function() {
  this.handlers = {};
  this.handler403 = null;
  this.handler404 = null;
  this.handler500 = null;
  this.meRouterDispatch = wr.bind(this, this.onRouterDispatch);
};


wr.App.prototype.enter = function() {
  wr.Router.getInstance().eventDispatch.listen(this.meRouterDispatch);
  wr.Router.getInstance().enter();
};


wr.App.prototype.exit = function() {
  wr.Router.getInstance().exit();
  wr.Router.getInstance().eventDispatch.unlisten(this.meRouterDispatch);
};


wr.App.prototype.onRouterDispatch = function(slugs) {
  if (slugs[0] in this.handlers) {
    this.handlers[slugs[0]](slugs);
    return;
  }
  this.handler404(slugs);
};
