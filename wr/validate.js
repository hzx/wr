

wr.loginRe_ = /^[a-zA-Z0-9\-_]+$/g
wr.passwordRe_ = /^[a-zA-Z0-9\-+_\/=]+$/g
wr.emailRe_ = /^(?:[a-zA-Z0-9\-_.]+)@(?:[a-zA-Zа-яА-Я0-9-_.]+)\.(?:[a-zA-Zа-яА-Я0-9-_]{2,}$)/g
wr.intRe_ = /^[-+]?[0-9]+$/g
wr.floatRe_ =  /^[-+]?[0-9]+\.?[0-9]*$/g
wr.hexColorRe_ = /^#?[a-fA-F0-9]{3,6}$/g


wr.validateLogin = function(value) {
  var isvalid = wr.loginRe_.test(value);
  wr.loginRe_.lastIndex = 0;
  return isvalid;
};


wr.validatePassword = function(value) {
  var isvalid = wr.passwordRe_.test(value);
  wr.passwordRe_.lastIndex = 0;
  return isvalid;
};


wr.validateEmail = function(value) {
  var isvalid = wr.emailRe_.test(value);
  wr.emailRe_.lastIndex = 0;
  return isvalid;
};


wr.validateInt = function(value) {
  var isvalid = wr.intRe_.test(value);
  wr.intRe_.lastIndex = 0;
  return isvalid;
};


wr.validateFloat = function(value) {
  var isvalid = wr.floatRe_.test(value);
  wr.floatRe_.lastIndex = 0;
  return isvalid;
};


wr.validateHexColor = function(value) {
  var isvalid = wr.hexColorRe_.test(value);
  wr.hexColorRe_.lastIndex = 0;
  return isvalid;
};
