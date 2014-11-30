
wr.SYNC_OP = 1;
wr.SYNC_NAME = 2;
wr.SYNC_PARAMS = 3;
wr.SYNC_BEFOREID = 4;
wr.SYNC_OBJ = 5;
wr.SYNC_ID = 6;

wr.SYNC_OP_UPDATE = 1;
wr.SYNC_OP_INSERT = 2;
wr.SYNC_OP_APPEND = 3;
wr.SYNC_OP_REMOVE = 4;
wr.SYNC_OP_MOVE = 5;


wr.Sync = function(url, name, collection, xsrf) {
  this.url = url;
  this.name = name;
  this.collection = collection;
  // this.xsrf = xsrf;
  this.orderField = null; // for subcollection only

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


wr.Sync.prototype.onUpdate = function(id, params) {
  if (!this.collection.sync) return;

  var data = {};
  data[wr.SYNC_OP] = wr.SYNC_OP_UPDATE;
  data[wr.SYNC_NAME] = this.name;
  data[wr.SYNC_ID] = id;
  data[wr.SYNC_PARAMS] = this.collection.serialize(params);

  var me = this;

  wr.post(this.url, data, world.xsrf, function(response) { // success
    var params = me.collection.unserialize(response);
    me.collection.updateLocal(id, params);
    // update additional fields
    // var rows = response.split(wr.DELIM_ROW);
    // var id = rows[0];
    // var fields = rows[1];
    // var updates = {};
    // for (var i = 0, length = fields.length; i < length; i += 2) {
    //   updates[fields[i]] = fields[i+1];
    // }
    // me.collection.update(id, updates);
  }, function(status, response) { // fail
  });
};


wr.Sync.prototype.onInsert = function(obj, beforeId) {
  if (!this.collection.sync) return;

  var data = {};
  if (beforeId) {
    data[wr.SYNC_OP] = wr.SYNC_OP_INSERT;
    data[wr.SYNC_BEFOREID] = beforeId;
  } else {
    data[wr.SYNC_OP] = wr.SYNC_OP_APPEND;
  }
  data[wr.SYNC_NAME] = this.name;
  data[wr.SYNC_OBJ] = this.collection.serialize(obj);

  var me = this;

  wr.post(this.url, data, world.xsrf, function(response) { // success
    var params = me.collection.unserialize(response);
    me.collection.updateLocal(obj[1], params);
    // update id
    // var ids = response.split(wr.DELIM_FIELD);
    // me.collection.updateId(ids[0], ids[1]);
  }, function(status, response) { // fail
  });
};


wr.Sync.prototype.onAppend = function(obj) {
  if (!this.collection.sync) return;

  var data = {};
  data[wr.SYNC_OP] = wr.SYNC_OP_APPEND;
  data[wr.SYNC_NAME] = this.name;
  data[wr.SYNC_OBJ] = this.collection.serialize(obj);

  var me = this;

  wr.post(this.url, data, world.xsrf, function(response) { // success
    var params = me.collection.unserialize(response);
    me.collection.updateLocal(obj[1], params);
    // update id
    // var ids = response.split(wr.DELIM_FIELD);
    // me.collection.updateId(ids[0], ids[1]);
  }, function(status, response) { // fail
  });
};


wr.Sync.prototype.onRemove = function(id) {
  if (!this.collection.sync) return;

  var data = {};
  data[wr.SYNC_OP] = wr.SYNC_OP_REMOVE;
  data[wr.SYNC_NAME] = this.name;
  data[wr.SYNC_ID] = id;

  wr.post(this.url, data, world.xsrf, function(response) {
    // dummy
  }, function(status, response) { // fail
  });
};


wr.Sync.prototype.onMove = function(id, beforeId) {
  if (!this.collection.sync) return;

  var data = {};
  data[wr.SYNC_OP] = wr.SYNC_OP_MOVE;
  data[wr.SYNC_NAME] = this.name;
  data[wr.SYNC_BEFOREID] = beforeId;
  data[wr.SYNC_ID] = id;
  // var data = {
  //   "op": 5,
  //   "name": this.name,
  //   "beforeId": beforeId,
  //   "id": id
  // };

  wr.post(this.url, data, world.xsrf, function(response) { // success
    // dummy
  }, function(status, response) { // fail
  });
};
