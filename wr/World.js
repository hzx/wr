
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


wr.World.prototype.parse = function(data) {
  var rows = data.split(wr.DELIM_ROW);
  var left = 0;
  var right = rows.length;

  while (left < right) {
    left = this.parseCollection(rows, left, right);
  }
};


wr.World.prototype.parseCollection = function(rows, left, right) {
  // skip one empty row
  if (rows[left].length === 0) return left + 1;

  // parse first row, must contain name and count
  var fields = rows[left].split(wr.DELIM_FIELD);
  var name = parseInt(fields[0]);
  var count = parseInt(fields[1]);
  var end = left + 1 + count;
  var coll = this.getCollection(name);

  if (coll) {
    for (var pos = left + 1; pos < end; ++pos) {
      coll.appendLocal(coll.unserialize(rows[pos]));
    }
  } else {
    var ent = this.getEntity(name);
    if (ent)
      ent.updateLocal(ent.unserialize(rows[pos]))
    else
      wr.log("unknown entity or collection: " + name);
  }

  return end;
};


wr.World.prototype.getCollection = function(name) {
  wr.log("override world.getCollection");
  return null;
};


wr.World.prototype.getEntity = function(name) {
  wr.log("override world.getEntity");
  return null;
};
