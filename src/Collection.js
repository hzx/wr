
wr.Collection = function() {
  // store for models objects
  this.objs = {};
  this.ids = [];

  this.eventInsert = new wr.Event();
  this.eventAppend = new wr.Event();
  this.eventRemove = new wr.Event();
  this.eventMove = new wr.Event();
};


wr.Collection.prototype.insert = function(obj, beforeId) {
  // not append doubles
  if (obj.id in this.objs) {
    return;
  }

  var ids = [];
  var i, length;

  // add to objects
  this.objs[obj.id] = obj;

  if (beforeId && beforeId in this.objs) {
    // add to ids
    var ib = this.ids.indexOf(beforeId);

    // copy elements until beforeId
    for (i = 0; i < ib; ++i) {
      ids.push(this.ids[i]);
    }

    // copy id
    ids.push(obj.id);

    // copy elements beforeId and after
    for (i = ib, length = this.ids.length; i < length; ++i) {
      ids.push(this.ids[i]);
    }

  } else {
    beforeId = null;

    ids.push(obj.id);

    // copy all id
    for (i = 0, length = this.ids.length; i < length; ++i) {
      ids.push(this.ids[i]);
    }
  }

  // swap ids
  this.ids = ids;

  this.eventInsert.notify2(obj, beforeId);
};


wr.Collection.prototype.append = function(obj) {
  // not append doubles
  if (obj.id in this.objs) {
    return;
  }

  this.objs[obj.id] = obj;
  this.ids.push(obj.id);

  this.eventAppend.notify(obj);
};


wr.Collection.prototype.get = function(id) {
  return id in this.objs ? this.objs[id] : null;
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
    for (i = ib, length = this.ids.length; ++i) {
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
