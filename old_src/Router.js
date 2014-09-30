
wr.Router = function() {
  var lastSlugs = null;
  var isDispatch = true;

  this.eventRoute = new wr.ObservableEvent();

  this.meHashChange = wr.bind(this, this.onHashChange);
};
wr.addSingletonGetter(wr.Router);

wr.Router.prototype.enter = function() {
  if ("onhashchange" in wr.global) {
    wr.on(wr.global, "hashchange", this.meHashChange);
  }
};

wr.Router.prototype.exit = function() {
  if ("onhashchange" in wr.global) {
    wr.off(wr.global, "hashchange", this.meHashChange);
  }
};

// take slugs from window location, call it to begin route app
wr.Router.prototype.init = function() {
  var slugs = wr.RouterHelper.getSlugs();
  this.setSlugs(slugs);
};

// slugs is null for "/" or "" path, or array
wr.Router.prototype.dispatch = function(slugs) {
  this.eventRoute.notify(slugs);
};

wr.Router.prototype.setSlugs = function(slugs) {
  // do not run dispatch onHashChange
  this.isDispatch = false;
  wr.RouterHelper.setSlugsToHash(slugs);
  this.lastSlugs = slugs;
  this.dispatch(slugs);
};

// events

wr.Router.prototype.onHashChange = function(e) {
  // work with pair setSlugs method
  if (!this.isDispatch) {
    this.isDispatch = true;
    return false;
  }
  var slugs = wr.RouterHelper.getSlugs();
  this.lastSlugs = slugs;
  this.dispatch(slugs);
};
