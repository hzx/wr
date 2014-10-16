

wr.loginSymbolsRe_ = /[a-zA-Z0-9\-_]*/g
wr.loginRe_ = /^[a-zA-Z0-9\-_]+$/g
wr.passwordSymbolsRe_ = /[a-zA-Z0-9\-+_\/=]*/g
wr.passwordRe_ = /^[a-zA-Z0-9\-+_\/=]+$/g
wr.emailSymbolsRe_ = /[a-zA-Zа-яА-Я0-9@\-_.]*/g
wr.emailRe_ = /^(?:[a-zA-Z0-9\-_.]+)@(?:[a-zA-Zа-яА-Я0-9\-_.]+)\.(?:[a-zA-Zа-яА-Я0-9\-_]{2,}$)/g
wr.intSymbolsRe_ = /[-+0-9]*/g
wr.intRe_ = /^[-+]?[0-9]+$/g
wr.floatSymbolsRe_ = /[-+.0-9]*/g
wr.floatRe_ =  /^[-+]?[0-9]+\.?[0-9]*$/g
wr.hexColorSymbolsRe_ = /[a-fA-F0-9]*/g
wr.hexColorRe_ = /^#?[a-fA-F0-9]{3,6}$/g


wr.validate = function(re, value) {
  var isvalid = re.test(value);
  re.lastIndex = 0;
  return isvalid;
};


wr.validateLoginSymbols = function(value) {
  return wr.validate(wr.loginSymbolsRe_, value);
};


wr.validateLogin = function(value) {
  return wr.validate(wr.loginRe_, value);
};


wr.validatePasswordSymbols = function(value) {
  return wr.validate(wr.passwordSymbolsRe_, value);
};


wr.validatePassword = function(value) {
  return wr.validate(wr.passwordRe_, value);
};


wr.validateEmailSymbols = function(value) {
  return wr.validate(wr.emailSymbolsRe_, value);
};


wr.validateEmail = function(value) {
  return wr.validate(wr.emailRe_, value);
};


wr.validateIntSymbols = function(value) {
  return wr.validate(wr.intSymbolsRe_, value);
};


wr.validateInt = function(value) {
  return wr.validate(wr.intRe_, value);
};


wr.validateFloatSymbols = function(value) {
  return wr.validate(wr.floatSymbolsRe_, value);
};


wr.validateFloat = function(value) {
  return wr.validate(wr.floatRe_, value);
};


wr.validateHexColorSymbols = function(value) {
  return wr.validate(wr.hexColorSymbolsRe_, value);
}


wr.validateHexColor = function(value) {
  return wr.validate(wr.hexColorRe_, value);
};
