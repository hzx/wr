
wr.QueryCollection = function() {
  wr.QueryCollection.base.constructor.call(this);

  this.parentCollection = null; // for local collection

  this.meIdUpdate = wr.bind(this, this.onIdUpdate);
  this.meUpdate = wr.bind(this, this.onUpdate);
  this.meReset = wr.bind(this, this.onReset);
  this.meInsert = wr.bind(this, this.onInsert);
  this.meAppend = wr.bind(this, this.onAppend);
  this.meRemove = wr.bind(this, this.onRemove);
  this.meMove = wr.bind(this, this.onMove);
};
wr.inherit(wr.QueryCollection, wr.Collection);


// method query obj for select
wr.QueryCollection.prototype.query = function(obj) {
  wr.log("override QueryCollection.query");
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
  this.query();
};


wr.QueryCollection.prototype.onInsert = function(obj, beforeId) {
  if (this.query(obj)) this.insert(obj, beforeId);
};


wr.QueryCollection.prototype.onAppend = function(obj) {
  if (this.query(obj)) this.append(obj);
};


wr.QueryCollection.prototype.onRemove = function(id) {
  this.remove(id);
};


wr.QueryCollection.prototype.onMove = function(id, beforeId) {
  this.move(id, beforeId);
};
