
wr.Collection = function(model) {
  this.model = model;
  this.parentId = null; // for ordered subcollection
  this.sync = true; // used in Sync

  // store for models objects
  this.objs = {};
  this.ids = [];

  this.eventIdUpdate = new wr.Event();
  this.eventUpdate = new wr.Event();
  this.eventReset = new wr.Event();
  this.eventInsert = new wr.Event();
  this.eventAppend = new wr.Event();
  this.eventRemove = new wr.Event();
  this.eventMove = new wr.Event(); // for subcollection in orderField
};


wr.Collection.prototype.serializeValue = function(name, value) {
  return this.model ? this.model.serializeValue(name, value) : value.toString();
};


wr.Collection.prototype.serialize = function(obj) {
  return this.model ? this.model.serialize(obj) : "";
};


wr.Collection.prototype.unserializeValue = function(name, value) {
  return this.model ? this.model.unserializeValue(name, value) : value;
};


wr.Collection.prototype.unserialize = function(obj) {
  return this.model ? this.model.unserialize(obj) : obj;
};


wr.Collection.prototype.reset = function(objs) {
  this.objs = {}
  this.ids = [];
  var obj;
  var id;

  for (var i = 0, length = objs.length; i < length; ++i) {
    obj = objs[i];
    id = obj[1];

    // skip doubles
    if (id in this.objs) {
      continue;
    }

    // this.objs[id] = this.unserialize(obj);
    this.objs[id] = obj;
    this.ids.push(id);
  }

  this.eventReset.notify(this);
};


wr.Collection.prototype.updateId = function(old, id) {
  if (old === id) return;

  // backup, delete and set with new id
  var obj = this.objs[old];
  delete this.objs[old];
  this.objs[id] = obj;
  
  // replace id in ids
  for (var i = 0, length = this.ids.length; i < length; ++i) {
    if (this.ids[i] === old) {
      this.ids[i] = id;
      break;
    }
  }

  this.eventIdUpdate.notify2(old, id);
};


wr.Collection.prototype.updateLocal = function(id, params) {
  this.sync = false;
  this.update(id, params);
  this.sync = true;
};


wr.Collection.prototype.update = function(id, params) {
  // check collection have object with id
  var obj = this.objs[id];
  if (!obj || wr.isEmpty(params)) return;

  // updateId, check id in params
  if ("1" in params) {
    this.updateId(id, params[1]);
    id = params[1]; // replace old id with new id from params
  }

  var updates = {};
  var value;

  for (var name in params) {
    value = this.unserializeValue(name, params[name]);
    if (obj[name] !== value) {
      obj[name] = value;
      updates[name] = value;
    }
  }

  if (!wr.isEmpty(updates)) {
    this.eventUpdate.notify2(id, updates);
  }
};


wr.Collection.prototype.updateRaw = function(id, raw) {
  var params = this.unserialize(raw);
  this.updateLocal(id, params);
};


wr.Collection.prototype.appendRaw = function(raw) {
  var obj = this.unserialize(raw);
  this.appendLocal(obj);
};


wr.Collection.prototype.insertLocal = function(obj, beforeId) {
  this.sync = false;
  this.insert(obj, beforeId);
  this.sync = true;
};


wr.Collection.prototype.insert = function(obj, beforeId) {
  var id = obj[1];

  // not append doubles
  if (id in this.objs) {
    return;
  }

  var ids = [];
  var i, length;

  // add to objects
  this.objs[id] = obj;

  if (beforeId && beforeId in this.objs) {
    // add to ids
    var ib = this.ids.indexOf(beforeId);

    // copy elements until beforeId
    for (i = 0; i < ib; ++i) {
      ids.push(this.ids[i]);
    }

    // copy id
    ids.push(id);

    // copy elements beforeId and after
    for (i = ib, length = this.ids.length; i < length; ++i) {
      ids.push(this.ids[i]);
    }

  } else {
    beforeId = null;

    ids.push(id);

    // copy all id
    for (i = 0, length = this.ids.length; i < length; ++i) {
      ids.push(this.ids[i]);
    }
  }

  // swap ids
  this.ids = ids;

  this.eventInsert.notify2(obj, beforeId);
};


wr.Collection.prototype.appendLocal = function(obj) {
  this.sync = false;
  this.append(obj);
  this.sync = true;
};


wr.Collection.prototype.append = function(obj) {
  var id = obj[1];

  // not append doubles
  if (id in this.objs) {
    return;
  }

  this.objs[id] = obj;
  this.ids.push(id);

  this.eventAppend.notify(obj);
};


wr.Collection.prototype.get = function(id) {
  return id in this.objs ? this.objs[id] : null;
};


wr.Collection.prototype.removeLocal = function(id) {
  this.sync = false;
  this.remove(id);
  this.sync = true;
};


wr.Collection.prototype.remove = function(id) {
  if (id in this.objs) {
    // remove from ids
    var i = this.ids.indexOf(id);
    if (i >= 0) {
      this.ids.splice(i, 1);
    }

    // remove from objects
    delete this.objs[id];

    this.eventRemove.notify(id);
  }
};


wr.Collection.prototype.empty = function() {
  this.reset([]);
};


wr.Collection.prototype.moveLocal = function(id, beforeId) {
  this.sync = false;
  this.move(id, beforeId);
  this.sync = true;
};


wr.Collection.prototype.move = function(id, beforeId) {
  if (id in this.objs && beforeId in this.objs) {
    var ids = [];
    var i, length;

    var im = this.ids.indexOf(id);
    var ib = this.ids.indexOf(beforeId);

    // copy elements until beforeId
    for (i = 0; i < ib; ++i) {
      // but except moved element
      if (i !== im) {
        ids.push(this.ids[i]);
      }
    }
    // copy moved element
    ids.push(this.ids[im]);
    // copy elements beforeId and after
    for (i = ib, length = this.ids.length; i < length; ++i) {
      // but except moved element
      if (i !== im) {
        ids.push(this.ids[i]);
      }
    }

    // swap ids
    this.ids = ids;

    this.eventMove.notify2(id, beforeId);
  }
};


// dont add/remove collection objects in fn!!!
wr.Collection.prototype.forEach = function(fn) {
  for (var i = 0, length = this.ids.length; i < length; ++i) {
    fn(this.objs[this.ids[i]]);
  }
};


// filter objs by fn
wr.Collection.prototype.filter = function(fn) {
  var ids = [];
  var obj;

  // collecti !fn ids for remove
  for (var i = 0, length = this.ids.length; i < length; ++i) {
    obj = this.objs[this.ids[i]];
    if (!fn(obj)) ids.push(obj[1]);
  }

  for (var r = 0, length = ids.length; r < length; ++r)
    this.remove(ids[r]);
};


// get next object relative to current object id
wr.Collection.prototype.next = function(id) {
  if (id in this.objs) {
    var i = this.ids.indexOf(id) + 1;
    return i < this.ids.length ? this.objs[this.ids[i]] : null;
  }

  return null;
};


// get prev object relative to current object id
wr.Collection.prototype.prev = function(id) {
  if  (id in this.objs) {
    var i = this.ids.indexOf(id) - 1;
    return i >= 0 ? this.objs[this.ids[i]] : null;
  }

  return null;
};


wr.Collection.prototype.parse = function(data) {
  data = wr.trimString(data);
  if (data.length === 0) return;

  var rows = data.split(wr.DELIM_ROW);
  var obj;

  for (var i = 0, length = rows.length; i < length; ++i) {
    obj = this.unserialize(rows[i]);
    if (obj !== null) this.appendLocal(obj);
  }
};
