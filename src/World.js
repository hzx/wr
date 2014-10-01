
wr.World = function() {
  this.xsrf = "";
  this.eventConnectionError = new wr.Error();
  this.eventClientError = new wr.Error();
  this.eventServerError = new wr.Error();
};


wr.World.prototype.setXsrf = function(xsrf) {
  this.xsrf = xsrf;
};


// wrap wr.get method, parse result and fire error events
wr.World.prototype.get = function(url, success, fail) {
  wr.get(url, function(response) { // success
    success(response);
  }, function(status, response) { // fail
    this.notifyFail(status, response);
    fail(status, response);
  });
};


// wrap wr.post method, parse result and fire error events
wr.World.prototype.post = function(url, data, success, fail) {
  wr.post(url, data, this.xsrf, function(response) { // success
    success(status, response);
  }, function(status, response) {
    this.notifyFail(status, response);
    fail(status, response);
  });
};


wr.World.prototype.notifyFail = function(status, response) {
  if (status === 0) {
    this.eventConnectionError.notify("Ошибка соединения, проверьте подключение к интернету.");
    return;
  }

  var message;

  try {
    message = response["message"];
  } catch (e) {
    message = "Ошибка " + status;
  }

  if (status >= 400 && status < 500) {
    this.eventClientError.notify(message);
    return;
  }

  if (status >= 500 && status < 600) {
    this.eventServerError.notify(message);
  }
};


