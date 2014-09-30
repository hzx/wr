
wr.Collection = function() {
  this.count = 0;
  this.nodes = {};
  this.first = null;
  this.last = null;

  this.genhash = wr.CollectionHelper.getHash;
};

wr.Collection.prototype.addObj = function(obj) {
  var node = wr.CollectionHelper.createNode(obj);
  ++this.count;
  this.nodes[this.getHash(obj)] = node;
  return node;
};

wr.Collection.prototype.attachFirstNode = function(node) {
  if (!this.first) {
    this.first = node;
    this.last = node;
  } else {
    node.next = this.first;
    this.first.prev = node;
    this.first = node;
  }
};

wr.Collection.prototype.attachLastNode = function(node) {
  if (!this.last) {
    this.last = node;
    this.first = node;
  } else {
    node.prev = this.last;
    this.last.next = node;
    this.last = node;
  }
};

wr.Collection.prototype.attachBeforeNode = function(node, before) {
  if (before.prev) {
    before.prev.next = node;
    node.prev = before.prev;
  } else {
    this.first = node;
  }
  before.prev = node;
  node.next = before;
};

wr.Collection.prototype.detachNode = function(node) {
  if (node.next) {
    node.next.prev = node.prev;
  } else {
    this.last = node.prev;
  }

  if (node.prev) {
    node.prev.next = node.next;
  } else {
    this.first = node.next;
  }

  node.prev = null;
  node.next = null;
};

wr.Collection.prototype.insert = function(obj) {
  var node = this.addObj(obj);
  this.attachFirstNode(node);
};

wr.Collection.prototype.insertBefore = function(obj, hash) {
  var node = this.addObj(obj);
  var before = this.nodes[hash];
  if (before) {
    this.attachBeforeNode(node, before);
  }
};

wr.Collection.prototype.append = function(obj) {
  var node = this.addObj(obj);
  this.attachLastNode(node);
};

wr.Collection.prototype.remove = function(hash) {
  var node = this.nodes[hash];
  if (!node) {
    return false;
  }

  this.detachNode(node);

  node.obj = null;
  delete this.nodes[hash];
  --this.count;

  return true;
};

wr.Collection.prototype.empty = function() {
  var hash;
  var node;

  // TODO: move through by first/next references
  for (hash in this.nodes) {
    node = this.nodes[hash];
    node.obj = null;
    node.prev = null;
    node.next = null;
    delete this.nodes[hash];
  }

  this.first = null;
  this.last = null;
  this.count = 0;
};

wr.Collection.prototype.get = function(hash) {
  var node = this.nodes[hash];
  if (!node) {
    return null;
  }
  return node.obj;
};

// if before is null move to end
wr.Collection.prototype.move = function(hash, before) {
  var node = this.nodes[hash];
  var befnode = this.nodes[before];
  if (!node) {
    return false;
  }
  if (befnode) {
    // already in right place
    if (node.next === befnode) {
      return false;
    }

    this.detachNode(node);
    this.attachBeforeNode(node, befnode);
    return true;
  } else {
    this.detachNode(node);
    this.attachLastNode(node);
  }
  return false;
};

