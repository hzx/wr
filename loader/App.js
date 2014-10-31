loader.App = function() {
  this.view = new loader.AppView();

  this.url = null;
  this.onsuccess = null; // accept params - xsrf, data

  this.xsrf = null;
  this.themeUrl = null;
  this.theme = null;
  this.appUrl = null;
  this.app = null;
  this.dataUrl = null;
  this.data = null;
};
wr.addSingleton(loader.App);


loader.App.prototype.init = function(url, success) {
  this.url = url;
  this.onsuccess = success;

  this.view.create();
  wr.appendChild(wr.global.document.body, this.view.node);

  var me = this;

  wr.get(url, function(response) { // success
    var values = response.split(wr.DELIM_FIELD);

    me.xsrf = values[0];
    me.themeUrl = values[1];
    me.appUrl = values[2];
    me.dataUrl = values[3];

    me.load();
  }, function(status, response) { // fail
    me.showError(status, response, url);
  });
};


loader.App.prototype.load = function() {
  var me = this;

  wr.getCached(this.themeUrl, function(response) { // success
    me.theme = response;
    me.decide();
  }, function(status, response) { // fail
    me.showError(status, response, me.themeUrl);
  });

  wr.getCached(this.appUrl, function(response) { // success
    me.app = response;
    me.decide();
  }, function(status, response) { // fail
    me.showError(status, response, me.appUrl);
  });

  if (this.dataUrl.length > 0) {
    wr.getCached(this.dataUrl, function(response) { // success
      me.data = response;
      me.decide();
    }, function(status, response) { // fail
      me.showError(status, response, me.dataUrl);
    });
  } else {
    this.data = "";
  }
};


loader.App.prototype.decide = function() {
  if (this.theme !== null && this.app !== null && this.data !== null) {
    wr.addCss(this.theme);
    wr.addJs(this.app);
    this.onsuccess(this.xsrf, this.data);
    wr.fadeOut(this.view.node, wr.slowTime, wr.dummy);
  }
};


loader.App.prototype.showError = function(status, response, url) {
  var msg = "Не удалось загрузить \"" + url + "\". " + response;
  this.view.showError(msg);
};
