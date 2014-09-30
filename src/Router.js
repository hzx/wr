
wr.Router = function() {
  this.lastSlugs = [];
  this.isDispatch = true;

  this.eventDispatch = new wr.Event();

  this.meHashChange = wr.bind(this, this.onHashChange);
};


wr.addSingleton(wr.Router);


wr.Router.prototype.enter = function() {
  if ("onhashchange" in wr.global) {
    wr.listen(wr.global, "hashchange", this.meHashChange);
  }
};

wr.Router.prototype.exit = function() {
  if ("onhashchange" in wr.global) {
    wr.unlisten(wr.global, "hashchange", this.meHashChange);
  }
};

// take slugs from window location, call it to begin route app
wr.Router.prototype.init = function() {
  var slugs = wr.RouterHelper.getSlugs();
  this.setSlugs(slugs);
  this.dispatch(slugs);
};

// slugs is null for "/" or "" path, or array
wr.Router.prototype.dispatch = function(slugs) {
  this.eventDispatch.notify(slugs);
};

wr.Router.prototype.setSlugs = function(slugs) {
  if (wr.equalArrays(this.lastSlugs, slugs)) {
    return;
  }
  // do not run dispatch onHashChange
  this.isDispatch = false;
  this.lastSlugs = slugs;
  wr.RouterHelper.setSlugsToHash(slugs);
};


// events

wr.Router.prototype.onHashChange = function(e) {
  // work with pair setSlugs method
  if (!this.isDispatch) {
    this.isDispatch = true;
    return;
  }
  var slugs = wr.RouterHelper.getSlugs();
  this.lastSlugs = slugs;
  this.dispatch(slugs);
};
