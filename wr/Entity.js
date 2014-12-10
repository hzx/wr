
wr.Entity = function(model) {
  this.model = model;
  this.obj = model.createDefault();
  this.sync = true; // used in Sync

  this.eventUpdate = new wr.Event();
};


wr.Entity.prototype.serializeValue = function(name, value) {
  return this.model ? this.model.serializeValue(name, value) : value.toString();
};


wr.Entity.prototype.serialize = function(obj) {
  return this.model ? this.model.serialize(obj) : "";
};


wr.Entity.prototype.unserializeValue = function(name, value) {
  return this.model ? this.model.unserializeValue(name, value) : value;
};


wr.Entity.prototype.unserialize = function(obj) {
  return this.model ? this.model.unserialize(obj) : obj;
};


wr.Entity.prototype.update = function(params) {
  var updates = {};
  var value;
  var isUpdate = false;

  for (var name in params) {
    var value = this.model.parse(name, params[name]);
    if (this.obj[name] !== value) {
      isUpdate = true;
      this.obj[name] = value;
      updates[name] = value;
    }
  }

  if (isUpdate) this.eventUpdate.notify(updates);
};


wr.Entity.prototype.updateLocal = function(params) {
  this.sync = false;
  this.update(params);
  this.sync = true;
};
