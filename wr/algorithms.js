
wr.qsortPartition = function(objs, left, right, pivot, compare) {
  var pivotValue = objs[pivot];
  objs[pivot] = objs[right];
  objs[right] = pivotValue;
  var storeIndex = left;
  var value = null;

  for (var i = left; i < right; ++i) {
    if (compare(objs[i], pivotValue)) {
      value = objs[i];
      objs[i] = objs[storeIndex];
      objs[storeIndex] = value;
      storeIndex = storeIndex + 1;
    }
  }

  value = objs[storeIndex];
  objs[storeIndex] = objs[right];
  objs[right] = value;

  return storeIndex;
};


wr.qsort = function(objs, left, right, compare) {
  if (left < right) {
    var pivot = Math.floor((left + right) / 2);
    var pivotNew = wr.qsortPartition(objs, left, right, pivot, compare);
    wr.qsort(objs, left, pivotNew - 1, compare);
    wr.qsort(objs, pivotNew + 1, right, compare);
  }
};
