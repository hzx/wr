
// TODO: make loading fail safe
wr.Loader = function() {
};
wr.addSingletonGetter(wr.Loader);

wr.Loader.prototype.loadJs = function(url, success, fail) {
  wr.Sender.getInstance().getCached(url, function(response) {
    // create js tag
    var js = wr.createElement("script");
    js.type = "text/javascript";
    js.text = response;
    wr.global.document.getElementsByTagName("head")[0].appendChild(js);

    success();
  }, function(response, status){
    fail(url, status);
  });
};
