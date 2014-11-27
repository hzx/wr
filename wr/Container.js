
// Is presenter linked to collection events and widget
// who show collection
wr.Container = function(collection, widget) {
  this.collection = collection;
  this.widget = widget;

  this.meIdChange = wr.bind(this, this.onIdChange);
  this.meUpdate = wr.bind(this, this.onUpdate);
  this.meReset = wr.bind(this, this.onReset);
  this.meInsert = wr.bind(this, this.onInsert);
  this.meAppend = wr.bind(this, this.onAppend);
  this.meRemove = wr.bind(this, this.onRemove);
  this.meMove = wr.bind(this, this.onMove);
};


wr.Container.prototype.enter = function() {
  this.collection.eventIdChange.listen(this.meIdChange);
  this.collection.eventUpdate.listen(this.meUpdate);
  this.collection.eventReset.listen(this.meReset);
  this.collection.eventInsert.listen(this.meInsert);
  this.collection.eventAppend.listen(this.meAppend);
  this.collection.eventRemove.listen(this.meRemove);
  this.collection.eventMove.listen(this.meMove);
};


wr.Container.prototype.exit = function() {
  this.collection.eventIdChange.unlisten(this.meIdChange);
  this.collection.eventUpdate.unlisten(this.meUpdate);
  this.collection.eventReset.unlisten(this.meReset);
  this.collection.eventInsert.unlisten(this.meInsert);
  this.collection.eventAppend.unlisten(this.meAppend);
  this.collection.eventRemove.unlisten(this.meRemove);
  this.collection.eventMove.unlisten(this.meMove);
};


wr.Container.prototype.onIdChange = function(old, id) {
  this.widget.changeId(old, id);
};


wr.Container.prototype.onUpdate = function(params) {
  this.widget.update(params);
};


wr.Container.prototype.onReset = function() {
  this.widget.empty();

  var me = this;
  this.collection.forEach(function(obj) {
    me.widget.append(obj);
  });
};


wr.Container.prototype.onInsert = function(obj, beforeId) {
  this.widget.insert(obj, beforeId);
};


wr.Container.prototype.onAppend = function(obj) {
  this.widget.append(obj);
};


wr.Container.prototype.onRemove = function(id) {
  this.widget.remove(id);
};


wr.Container.prototype.onMove = function(id, beforeId) {
  this.widget.move(id, beforeId);
};
