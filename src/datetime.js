
wr.paddingZero_ = function(num) {
  return (+num < 10 ? "0" : "") + num;
};

wr.dateFormats_ = {
  "d": function(date) {
    return wr.paddingZero_(date.getDate());
  },

  "m": function(date) {
    return wr.paddingZero_(date.getMonth() + 1);
  },

  "y": function(date) {
    return date.getYear() % 100;
  },

  "H": function(date) {
    return wr.paddingZero_(date.getHours());
  },

  "M": function(date) {
    return wr.paddingZero_(date.getMinutes());
  },

  "S": function(date) {
    return wr.paddingZero_(date.getSeconds());
  },

  "Y": function(date) {
    return date.getFullYear();
  },

  // Format shorthands
  "F": "%Y-%m-%d",
  "D": "%m/%d/%y",
  "L": "%Y-%m-%d %H:%M:%S"
};

wr.dateLRe_ = /([\d]{4})-([\d]{2})-([\d]{2})(?:[\ |T])([\d]{2}):([\d]{2}):([\d]{2})/g;

wr.strftime = function(date, format) {
  return (format + "").replace(/%([a-zA-Z])/g, function(m, f) {
    // var formatter = wr.dateFormats_ && wr.dateFormats_[f];
    var formatter = wr.dateFormats_[f];

    if (typeof formatter == "function") {
      return formatter.call(wr.dateFormats_, date);
    } else if (typeof formatter == "string") {
      return wr.strftime(date, formatter);
    }

    return f;
  });
};

// IE not support Date.parse
wr.parseTimeL = (function() {
  var testDate = new Date("2009-12-05 03:07:08");
  return testDate.getFullYear() ? function(str) {
    return new Date(str);
  } : function(str) {
    var res = wr.dateLRe_.exec(str);
    wr.dateLRe_.lastIndex = 0;

    if (res && res.length === 7) {
      var date = new Date();
      date.setFullYear(res[1]);
      date.setMonth(wr.global.parseInt(res[2], 10) - 1);
      date.setDate(res[3]);
      date.setHours(res[4]);
      date.setMinutes(res[5]);
      date.setSeconds(res[6]);
      return date;
    }
    return null;
  };
})();
