
wr.World = function() {
  this.xsrf = "";
};


wr.World.prototype.setXsrf = function(xsrf) {
  this.xsrf = xsrf;
};


// wrap wr.get method, parse result and fire error events
// manage tasks
wr.World.prototype.get = function(url, success, fail) {
  wr.get(url, function(response) { // success
    success(response);
  }, function(status, response) { // fail
    fail(status, response);
  });
};


// wrap wr.post method, parse result and fire error events
wr.World.prototype.post = function(url, data, success, fail) {
  wr.post(url, data, this.xsrf, function(response) { // success
    success(response);
  }, function(status, response) {
    fail(status, response);
  });
};


wr.World.prototype.postFiles = function(url, files, success, fail, progress) {
  wr.postFiles(url, files, this.xsrf, function(response) { // success
    success(response);
  }, function(status, response) { // fail
    fail(status, response);
  }, progress);
};