
wr.netHasher = new wr.Hasher();
wr.eventConnectionError = new wr.Event();
wr.eventClientError = new wr.Event();
wr.eventServerError = new wr.Event();
wr.isFormData = !! wr.global.FormData;


wr.createXhr = (function() {
  var methods = [
    function() { return new XMLHttpRequest(); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
    function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
  ];

  var method = null;
  for (var i = 0, length = methods.length; i < length; ++i) {
    try {
      method = methods[i];
      method();
    } catch (e) {
      continue;
    }
    return method;
  }

  wr.log("[erorr]: createXhr method not found");
})();


wr.notifyFail = function(status, response) {
  if (status === 0) {
    wr.eventConnectionError.notify("Ошибка соединения, проверьте подключение к интернету.");
    return;
  }

  var message;

  try {
    message = response["message"];
  } catch (e) {
    message = "Ошибка " + status;
  }

  if (status >= 400 && status < 500) {
    wr.eventClientError.notify(message);
    return;
  }

  if (status >= 500 && status < 600) {
    wr.eventServerError.notify(message);
  }
};


wr.saltUrl = function(url) {
  return url + (/\?/.test(url) ? "&" : "?") + wr.netHasher.generate();
};


wr.encodeData = function(data) {
  var buf = [];
  for (var name in data) {
    buf.push(name + "=" + wr.global.encodeURIComponent(data[name]));
  }
  return buf.join("&");
};


wr.Xhr = function() {
  this.xhr = wr.createXhr();
};


wr.Xhr.prototype.ajax = function(params) {
  this.xhr.open(params.method, params.url, true);
  this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  for (var name in params.headers) {
    this.xhr.setRequestHeader(name, params.headers[name]);
  }

  xhr.send(params.data);
};


wr.Xhr.prototype.parseResponse = function() {
};


wr.Xhr.prototype.onreadystatechange = function() {
};


// params - {method, headers, url, data, success, fail}
wr.ajax = function(params) {
  var xhr = wr.createXhr();

  xhr.onreadystatechange = function() {
  // var onReadyStateChange = function() {
    if (xhr.readyState === 4) {
      var response;
      var status = xhr.status;

      var contentType = xhr.getResponseHeader("Content-Type");
      if (contentType) {
        switch (contentType.toLowerCase()) {
          case "application/json;charset=utf-8":
            try {
              response = JSON.parse(xhr.responseText);
            } catch (e) {
              response = {};
            }
            break;
          default:
            response = xhr.responseText;
            break;
        }
      }

      // clean xhr
      xhr.onreadystatechange = null;
      // wr.unlisten(xhr, "readystatechange", onReadyStateChange);
      delete xhr;
      xhr = null;

      if (status === 200) {
        params.success(response);
      } else {
        wr.notifyFail(status, response);
        params.fail(status, response);
      }
    }
  };

  // wr.listen(xhr, "readystatechange", onReadyStateChange);

  xhr.open(params.method, params.url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  for (var name in params.headers) {
    xhr.setRequestHeader(name, params.headers[name]);
  }

  xhr.send(params.data);
};


wr.get = function(url, success, fail) {
  var params = {
    method: "GET",
    headers: {},
    url: wr.saltUrl(url),
    data: null,
    success: success,
    fail: fail
  };
  wr.ajax(params);
};


wr.post = function(url, data, xsrf, success, fail) {
  var params = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Xsrftoken": xsrf
    },
    url: url,
    data: wr.encodeData(data),
    success: success,
    fail: fail
  };
  wr.ajax(params);
};


wr.postFile = function(url, data, xsrf, success, fail) {
  var params = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Xsrftoken": xsrf
    },
    url: url,
    data: data,
    success: success,
    fail: fail
  };
  wr.ajax(params);
};


wr.getCached = function(url, success, fail) {
  var params = {
    method: "GET",
    headers: {},
    url: url,
    data: null,
    success: success,
    fail: fail
  };
  wr.ajax(params);
};
