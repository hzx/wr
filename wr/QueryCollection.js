
wr.QueryCollection = function(parentCollection) {
  wr.QueryCollection.base.constructor.call(this);

  this.parentCollection = parentCollection;

  this.meIdUpdate = wr.bind(this, this.onIdUpdate);
  this.meUpdate = wr.bind(this, this.onUpdate);
  this.meReset = wr.bind(this, this.onReset);
  this.meInsert = wr.bind(this, this.onInsert);
  this.meAppend = wr.bind(this, this.onAppend);
  this.meRemove = wr.bind(this, this.onRemove);
  this.meMove = wr.bind(this, this.onMove);
};
wr.inherit(wr.QueryCollection, wr.Collection);


wr.QueryCollection.prototype.enter = function() {
  this.parentCollection.eventIdUpdate.listen(this.meIdUpdate);
  this.parentCollection.eventUpdate.listen(this.meUpdate);
  this.parentCollection.eventReset.listen(this.meReset);
  this.parentCollection.eventInsert.listen(this.meInsert);
  this.parentCollection.eventAppend.listen(this.meAppend);
  this.parentCollection.eventRemove.listen(this.meRemove);
  this.parentCollection.eventMove.listen(this.meMove);
};


wr.QueryCollection.prototype.exit = function() {
  this.parentCollection.eventIdUpdate.unlisten(this.meIdUpdate);
  this.parentCollection.eventUpdate.unlisten(this.meUpdate);
  this.parentCollection.eventReset.unlisten(this.meReset);
  this.parentCollection.eventInsert.unlisten(this.meInsert);
  this.parentCollection.eventAppend.unlisten(this.meAppend);
  this.parentCollection.eventRemove.unlisten(this.meRemove);
  this.parentCollection.eventMove.unlisten(this.meMove);
};


// method query obj for select
wr.QueryCollection.prototype.query = function(obj) {
  wr.log("override QueryCollection.query");
};


wr.QueryCollection.prototype.sort = function(objs) {
  wr.log("override QueryCollection.sort");
};


wr.QueryCollection.prototype.onIdUpdate = function(old, id) {
  var obj = this.get(old);
  if (this.query(obj)) this.updateId(old, id);
};


wr.QueryCollection.prototype.onUpdate = function(id, params) {
  var obj = this.get(id);
  if (this.query(obj)) this.update(id, params);
};


wr.QueryCollection.prototype.onReset = function() {
  var me = this;
  var objs = [];

  this.parentCollection.forEach(function(obj) {
    if (me.query(obj)) objs.push(obj);
  });

  this.sort(objs);
  this.reset(objs);
};


wr.QueryCollection.prototype.onInsert = function(obj, beforeId) {
  if (this.query(obj)) this.insert(obj, beforeId);
};


wr.QueryCollection.prototype.onAppend = function(obj) {
  wr.log("onAppend:");
  wr.log(obj);
  if (this.query(obj)) this.append(obj);
};


wr.QueryCollection.prototype.onRemove = function(id) {
  this.remove(id);
};


wr.QueryCollection.prototype.onMove = function(id, beforeId) {
  this.move(id, beforeId);
};
