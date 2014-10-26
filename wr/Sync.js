
wr.Sync = function(url, name, collection, xsrf) {
  this.url = url;
  this.name = name;
  this.collection = collection;
  this.xsrf = xsrf;

  this.meUpdate = wr.bind(this, this.onUpdate);
  this.meInsert = wr.bind(this, this.onInsert);
  this.meAppend = wr.bind(this, this.onAppend);
  this.meRemove = wr.bind(this, this.onRemove);
  this.meMove = wr.bind(this, this.onMove);

  this.enter();
};


wr.Sync.prototype.enter = function() {
  this.collection.eventUpdate.listen(this.meUpdate);
  this.collection.eventInsert.listen(this.meInsert);
  this.collection.eventAppend.listen(this.meAppend);
  this.collection.eventRemove.listen(this.meRemove);
  this.collection.eventMove.listen(this.meMove);
};


wr.Sync.prototype.exit = function() {
  this.collection.eventUpdate.unlisten(this.meUpdate);
  this.collection.eventInsert.unlisten(this.meInsert);
  this.collection.eventAppend.unlisten(this.meAppend);
  this.collection.eventRemove.unlisten(this.meRemove);
  this.collection.eventMove.unlisten(this.meMove);
};


wr.Sync.prototype.onUpdate = function(params) {
  var data = {
    "op": 1,
    "name": this.name,
    "params": this.collection.serialize(params)
  };

  wr.post(this.url, data, this.xsrf, function(response) { // success
  }, function(status, response) { // fail
  });
};


wr.Sync.prototype.onInsert = function(obj, beforeId) {
  var data = {
    "op": 2,
    "name": this.name,
    "beforeId": beforeId,
    "obj": this.collection.serialize(obj)
  };

  wr.post(this.url, data, this.xsrf, function(response) { // success
    // update id
  }, function(status, response) { // fail
  });
};


wr.Sync.prototype.onAppend = function(obj) {
  var data = {
    "op": 3,
    "name": this.name,
    "obj": this.collection.serialize(obj)
  };

  wr.post(this.url, data, this.xsrf, function(response) { // success
    // update id
  }, function(status, response) { // fail
  });
};


wr.Sync.prototype.onRemove = function(id) {
  var data = {
    "op": 4,
    "name": this.name,
    "id": id
  };

  wr.post(this.url, data, this.xsrf, function(response) {
  }, function(status, response) { // fail
  });
};


wr.Sync.prototype.onMove = function(id, beforeId) {
  var data = {
    "op": 5,
    "name": this.name,
    "beforeId": beforeId,
    "id": id
  };

  wr.post(this.url, data, this.xsrf, function(response) { // success
  }, function(status, response) { // fail
  });
};
