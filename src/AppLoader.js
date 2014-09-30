// TODO: create progress loading

wr.AppLoader = function() {
  this.xsrf = "";
  this.app = null;
  this.queueCss = {};
  this.queueJs = {};
  this.queueJson = {};
  this.initUrl = null;
  this.settings = null; // app settings.json
  this.done = false;
};


wr.AppLoader.prototype.enqueueCss = function(url) {
  this.queueCss[url] = null;
};


wr.AppLoader.prototype.enqueueJs = function(url) {
  this.queueJs[url] = null;
};


wr.AppLoader.prototype.enqueueJson = function(url) {
  this.queueJson[url] = null;
};


wr.AppLoader.prototype.loadCss = function(url) {
  var me = this;
  wr.getCached(url, function(response) { // success
    me.queueCss[url] = response;
    me.decide();
  }, function(status, response) { // fail
    if (status >= 400) {
      me.app.fail(url, status, response);
    }
  });
};


wr.AppLoader.prototype.loadJs = function(url) {
  var me = this;
  wr.getCached(url, function(response) { // success
    me.queueJs[url] = response;
    me.decide();
  }, function(status, response) { // fail
    if (status >= 400) {
      me.app.fail(url, status, response);
    }
  });
};


wr.AppLoader.prototype.loadJson = function(url) {
  var me = this;
  wr.get(url, function(response) { // success
    me.queueJson[url] = response;
    me.decide();
  }, function(status, response) { // fail
    if (status >= 400) {
      me.app.fail(url, status, response);
    }
  });
};


// check if 100% loaded run app
wr.AppLoader.prototype.decide = function() {
  if (this.done) return;

  // TODO: check by resources done counter

  // check css queue loaded
  for (var cssurl in this.queueCss) {
    if (this.queueCss[cssurl] === null) {
      return;
    }
  }

  // check js queue loaded
  for (var jsurl in this.queueJs) {
    if (this.queueJs[jsurl] === null) {
      return;
    }
  }

  // check json queue loaded
  for (var jsonurl in this.queueJson) {
    if (this.queueJson[jsonurl] === null) {
      return;
    }
  }

  // all checks passed - mark done flag
  this.done = true;

  // add css
  for (var cssurl in this.queueCss) {
    wr.addCss(this.queueCss[cssurl]);
  }

  // add js
  for (var jsurl in this.queueJs) {
    wr.addJs(this.queueJs[jsurl]);
  }

  // 100% done, notify app
  this.app.success(this.queueJson);
};


wr.AppLoader.prototype.run = function() {
  // load js
  for (var jsurl in this.queueJs) {
    // skip loaded
    if (this.queueJs[jsurl] !== null) {
      continue;
    }
    this.loadJs(jsurl);
  }

  // load css
  for (var cssurl in this.queueCss) {
    // skip loaded
    if (this.queueCss[cssurl] !== null) {
      continue;
    }
    this.loadCss(cssurl);
  }

  // load json
  for (var jsonurl in this.queueJson) {
    // skip loaded
    if (this.queueJson[jsonurl] !== null) {
      continue;
    }
    this.loadJson(jsonurl);
  }
};


// load settings and load resourses
// app must implement 2 methods:
// success(jsons) - jsons = { "/world1": "{}" }
// fail(url, status, response)
// settings response must be:
// {
//    "css": ["theme1.css", "theme2.css"],
//    "js": ["app1.js", "app2.js"],
//    "json": ["world1", "world2"]
// }
wr.AppLoader.prototype.init = function(app, url) {
  this.app = app;
  this.initUrl = url;
  var me = this;
  wr.get(url, function(response) { // success
    me.settings = response;
    // add settings resourses to queue
    var buf, i, length;
    if ("css" in response) {
      buf = response["css"];
      for (i = 0, length = buf.length; i < length; ++i) {
        me.enqueueCss(buf[i]);
      }
    }
    if ("js" in response) {
      buf = response["js"];
      for (i = 0, length = buf.length; i < length; ++i) {
        me.enqueueJs(buf[i]);
      }
    }
    if ("json" in response) {
      buf = response["json"];
      for (i = 0, length = buf.length; i < length; ++i) {
        me.enqueueJson(buf[i]);
      }
    }
    if ("_xsrf" in response) {
      me.xsrf = response["_xsrf"];
    }
    me.run();
  }, function(status, response) { // fail
    if (status >= 400) {
      me.app.fail(url, status, response);
    }
  });
};


