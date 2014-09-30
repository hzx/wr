
wr.CollectionHelper = {};
wr.CollectionHelper.createNode = function(obj) {
  return {
    obj: obj,
    prev: null,
    next: null
  };
};

wr.CollectionHelper.getHash = function(obj) {
  return obj.id;
};

wr.CollectionHelper.getModelHash = function(obj) {
  return obj.id.value;
};
