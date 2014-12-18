
wr.Model = function(fields) {
  this.fields = fields;
};


wr.Model.prototype.serializeValue = function(value, type) {
  switch (type) {
    case "int":
      return value;
    case "float":
      return value;
    case "string":
      return value;
    case "date":
      return wr.strftime(value, "%L");
    case "tdate":
      return value.getTime();
    case "image":
      return value;
    default:
      return "";
  };
};


wr.Model.prototype.serialize = function(obj) {
  var buf = [];
  var params;

  for (var name in obj) {
    if (name in this.fields) {
      params = this.fields[name];
      buf.push(name);
      buf.push(this.serializeValue(obj[name], params.type));
    }
  }

  return buf.join(wr.DELIM_FIELD);
};


wr.Model.prototype.unserializeValue = function(name, value) {
  if (!(name in this.fields)) return null;
  var params = this.fields[name];

  switch (params.type) {
    case "int":
      return parseInt(value);
    case "date":
      return wr.parseTimeL(value);
    case "tdate":
      return new Date(parseInt(value));
    case "string":
      return value;
    case "float":
      return parseFloat(value);
    case "image":
      return value;
    default:
      return null;
  }
};


wr.Model.prototype.unserialize = function(val) {
  var dest = {};
  var fields = val.split(wr.DELIM_FIELD);
  var name;

  for (var i = 0, length = fields.length; i < length; i += 2) {
    name = fields[i];
    if (name.length == 0) return dest;
    dest[name] = this.unserializeValue(name, fields[i+1]);
  }

  return dest;
};


wr.Model.prototype.createDefault = function() {
  var obj = {};
  for (var name in this.fields) {
    obj[name] = this.fields[name].def;
  }

  obj[1] = wr.hash();

  return obj;
};
