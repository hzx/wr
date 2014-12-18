
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

  if (status >= 400 && status < 500) {
    wr.eventClientError.notify2(status, response);
    return;
  }

  if (status >= 500 && status < 600) {
    wr.eventServerError.notify2(status, response);
  }
};


wr.saltUrl = function(url) {
  return url + (/\?/.test(url) ? "&" : "?") + wr.hash();
};


wr.encodeData = function(data) {
  var buf = [];
  for (var name in data) {
    buf.push(name + "=" + wr.global.encodeURIComponent(data[name]));
  }
  return buf.join("&");
};


// params - {method, headers, url, data, success, fail}
wr.ajax = function(params) {
  var xhr = wr.createXhr();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var response = xhr.responseText;
      var status = xhr.status;

      // clean xhr
      xhr.onreadystatechange = null;
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

  xhr.open(params.method, params.url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  for (var name in params.headers) {
    xhr.setRequestHeader(name, params.headers[name]);
  }

  xhr.send(params.data);
};


wr.get = function(url, success, fail, progress) {
  var params = {
    method: "GET",
    headers: {},
    url: wr.saltUrl(url),
    data: null,
    success: success,
    fail: fail,
    progress: progress
  };

  wr.ajax(params);
};


wr.post = function(url, data, xsrf, success, fail, progress) {
  var params = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Xsrftoken": xsrf
    },
    url: url,
    data: wr.encodeData(data),
    success: success,
    fail: fail,
    progress: progress
  };

  wr.ajax(params);
};


wr.postFiles = function(url, files, xsrf, success, fail, progress) {
  var data = new FormData();
  var file;

  for (var i = 0, length = files.length; i < length; ++i) {
    file = files[i];
    data.append(file.name, file);
  }

  var params = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Xsrftoken": xsrf
    },
    url: url,
    data: data,
    success: success,
    fail: fail,
    progress: progress
  };

  wr.ajax(params);
};


wr.getCached = function(url, success, fail, progress) {
  var params = {
    method: "GET",
    headers: {},
    url: url,
    data: null,
    success: success,
    fail: fail,
    progress: progress
  };

  wr.ajax(params);
};
