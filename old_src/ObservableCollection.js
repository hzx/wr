
wr.ObservableCollection = function() {
  wr.ObservableCollection.base.constructor.call(this);

  this.getHash = wr.ObservableCollectionHelper.getHash;

  // for better updates
  this.changeTime = null;

  // observables, all mutable operations
  this.eventInsert = new wr.ObservableEvent();
  this.eventInsertBefore = new wr.ObservableEvent2();
  this.eventAppend = new wr.ObservableEvent();
  this.eventRemove = new wr.ObservableEvent();
  this.eventMove = new wr.ObservableEvent2();
  this.eventRefresh = new wr.ObservableEvent0();
};
wr.inherits(wr.ObservableCollection, wr.Collection);

// override

wr.ObservableCollection.prototype.insert = function(obj) {
  wr.ObservableCollection.base.insert.call(this, obj);
  this.changeTime = new Date();
  this.eventInsert.notify(obj);
};

wr.ObservableCollection.prototype.insertBefore = function(obj, hash) {
  wr.ObservableCollection.base.insertBefore.call(this, obj, hash);
  this.changeTime = new Date();
  this.eventInsertBefore.notify(obj, hash);
};

wr.ObservableCollection.prototype.append = function(obj) {
  wr.ObservableCollection.base.append.call(this, obj);
  this.changeTime = new Date();
  this.eventAppend.notify(obj);
};

wr.ObservableCollection.prototype.remove = function(hash) {
  wr.ObservableCollection.base.remove.call(this, hash);
  this.changeTime = new Date();
  this.eventRemove.notify(hash);
};

wr.ObservableCollection.prototype.empty = function() {
  wr.ObservableCollection.base.empty.call(this);
  this.changeTime = new Date();
  this.eventRefresh.notify();
};

wr.ObservableCollection.prototype.move = function(hash, before) {
  wr.ObservableCollection.base.move.call(this, hash, before);
  this.changeTime = new Date();
  this.eventMove.notify(hash, before);
};
