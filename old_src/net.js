
wr.createXhr = (function() {
  var i, method, methods;
  methods = [
    function() { return new XMLHttpRequest(); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
    function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
  ];
  
  for (i = 0; i < methods.length; ++i) {
    try {
      method = methods[i];
      method();
    } catch (e) {
      continue;
    }
    return method;
  }
  wr.log("wr: createXhr method not found");
})();

// TODO: realize request with progress
wr.Sender = function() {
  this.xsrf = "";
  this.hashgen = new wr.HashGen();
  this.eventFail = new wr.ObservableEvent();
};
wr.addSingletonGetter(wr.Sender);
wr.Sender.MAX_CONNECTIONS = 8;
wr.Sender.GET = "GET";
wr.Sender.POST = "POST";
wr.Sender.REQ_JSON = "REQ_JSON";
wr.Sender.FILES_FIELD = "files";
wr.Sender.GET_HEADERS = {
};
wr.Sender.POST_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded"
};
wr.Sender.FAIL_SERVER = 0;
wr.Sender.FAIL_NET = 1;

wr.Sender.prototype.setXsrf = function(xsrf) {
  this.xsrf = xsrf;
};

// TODO: get free xhr
wr.Sender.prototype.getFreeXhr = function() {
  return wr.createXhr();
};

wr.Sender.prototype.setHeaders_ = function(xhr, headers) {
  var name;
  for (name in headers) {
    xhr.setRequestHeader(name, headers[name]);
  }
}

wr.Sender.prototype.saltUrl_ = function(url) {
  return url + (/\?/.test(url) ? "&" : "?") + this.hashgen.create();
};

wr.Sender.prototype.encodeData_ = function(data) {
  var name, buf = ["_xsrf=" + this.xsrf];
  for (name in data) {
    buf.push(name + "=" + wr.global.encodeURIComponent(data[name]));
  }
  return buf.join("&");
};

// TODO: union params to object literal, save requests
wr.Sender.prototype.request_ = function(method, kind, headers, url, data, success, fail) {
  var response, status;
  var xhr = this.getFreeXhr();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      status = xhr.status;

      xhr.onreadystatechange = null;
      delete xhr;

      if (status === 200) {
        if (kind === wr.Sender.REQ_JSON) {
          response = JSON.parse(xhr.responseText);
        } else {
          response = xhr.responseText;
        }
        success(response);
      } else {
        response = xhr.responseText;
        // TODO: analyze error and try resend
        this.eventFail.notify(status);
        fail(response, status);
      }
    }
  };

  xhr.open(method, url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  this.setHeaders_(xhr, headers);
  xhr.send(data);
};

wr.Sender.prototype.get = function(url, success, fail) {
  var salted = this.saltUrl_(url);
  this.request_(wr.Sender.GET, null, wr.Sender.GET_HEADERS, salted, null, success, fail);
};

wr.Sender.prototype.getJson = function(url, success, fail) {
  var salted = this.saltUrl_(url);
  this.request_(wr.Sender.GET, wr.Sender.REQ_JSON, wr.Sender.GET_HEADERS, salted, null, success, fail);
};

wr.Sender.prototype.getCached = function(url, success, fail) {
  this.request_(wr.Sender.GET, null, wr.Sender.GET_HEADERS, url, null, success, fail);
};

wr.Sender.prototype.post = function(url, data, success, fail) {
  var encoded = this.encodeData_(data);
  this.request_(wr.Sender.POST, null, wr.Sender.POST_HEADERS, url, encoded, success, fail);
};

wr.Sender.prototype.postJson = function(url, data, success, fail) {
  var encoded = this.encodeData_(data);
  this.request_(wr.Sender.POST, wr.Sender.REQ_JSON, wr.Sender.POST_HEADERS, url, encoded, success, fail);
};

wr.Sender.prototype.postFiles = function(url, files, data, success, fail) {
  var name, i;
  var formData = new FormData();
  formData.append("_xsrf", this.xsrf);
  for (name in data) {
    formData.append(name, encodeURIComponent(data[name]));
  }
  for (i = 0; i < files.length; ++i) {
    formData.append(wr.Sender.FILES_FIELD, files[i]);
  }

  this.request_(wr.Sender.POST, wr.Sender.REQ_JSON, wr.Sender.GET_HEADERS, url, formData, success, fail);
};
