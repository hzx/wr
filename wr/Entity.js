
wr.Entity = function(model) {
  this.model = model;
  this.obj = model.createDefault();

  this.eventUpdate = new wr.Event();
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


wr.entity = function(modelClass) {
  return new wr.Entity(new modelClass());
};
