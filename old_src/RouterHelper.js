
wr.RouterHelper = {};

  // url (0), scheme (1), slash (2), host (3), port (4), path (5), query (6), hash (7)
wr.RouterHelper.parse_url_re = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

  // array of slugs
wr.RouterHelper.match_slug_re = /([a-zA-Z\-_0-9]+)/g;

wr.RouterHelper.parseUrl = function(url) {
  var address = wr.RouterHelper.parse_url_re.exec(url);
  wr.RouterHelper.parse_url_re.lastIndex = 0;
  return address;
};

wr.RouterHelper.parseSlugs = function(path) {
  var slugs = path.match(wr.RouterHelper.match_slug_re);
  wr.RouterHelper.match_slug_re.lastIndex = 0;
  return slugs;
};

// get current location url, parse addrss, extract from hash slugs
// for application
wr.RouterHelper.getSlugs = function() {
  var url = wr.global.location.toString();
  var address = wr.RouterHelper.parseUrl(url);
  var hash = address[7];
  var slugs = wr.RouterHelper.parseSlugs(hash);
  return slugs;
};

wr.RouterHelper.slugsToPath = function(slugs) {
  var pices = [""];

  if (slugs === null) {
    return "/";
  }

  return pices.concat(slugs).join("/");
};

wr.RouterHelper.setSlugsToHash = function(slugs) {
  var path = wr.RouterHelper.slugsToPath(slugs);
  wr.global.location.hash = path;
};
