
wr.Collection = function() {
  // store for models objects
  this.objects = [];
  this.idObjects = {};

  this.eventInsert = new wr.Event();
  this.eventAppend = new wr.Event();
  this.eventRemove = new wr.Event();
  this.eventMove = new wr.Event();
};


wr.Collection.prototype.insert = function(obj, beforeId) {
  this.eventInsert.notify2(obj, beforeId);
};


wr.Collection.prototype.append = function(obj) {
  this.eventAppend.notify(obj);
};


wr.Collection.prototype.get = function(id) {
};


wr.Collection.prototype.remove = function(id) {
  this.eventRemove.notify(id);
};


wr.Collection.prototype.move = function(id, beforeId) {
  this.eventMove.notify2(id, beforeId);
};
