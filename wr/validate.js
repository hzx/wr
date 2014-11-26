

wr.nameSymbolsRe = /[^[a-zA-Z0-0\-\ ]*$]/g;
wr.loginSymbolsRe_ = /^[a-zA-Z0-9\-_]*$/g;
wr.loginRe_ = /^[a-zA-Z0-9\-_]+$/g;
wr.passwordSymbolsRe_ = /^[a-zA-Z0-9\-+_\/=]*$/g;
wr.passwordRe_ = /^[a-zA-Z0-9\-+_\/=]+$/g;
wr.emailSymbolsRe_ = /^[a-zA-Zа-яА-Я0-9@\-_.]*$/g;
wr.emailRe_ = /^(?:[a-zA-Z0-9\-_.]+)@(?:[a-zA-Zа-яА-Я0-9\-_.]+)\.(?:[a-zA-Zа-яА-Я0-9\-_]{2,}$)/g;
wr.intSymbolsRe_ = /^[-+0-9]*$/g;
wr.intRe_ = /^[-+]?[0-9]+$/g;
wr.intOptRe_ = /^(?:[-+]?[0-9]+)?$/g;
wr.floatSymbolsRe_ = /^[-+.0-9]*$/g;
wr.floatRe_ =  /^[-+]?[0-9]+\.?[0-9]*$/g;
wr.floatOptRe_ = /^(?:[-+]?[0-9]+\.?[0-9]*)?$/g;
wr.hexColorSymbolsRe_ = /^[a-fA-F0-9]*$/g;
wr.hexColorRe_ = /^#?[a-fA-F0-9]{3,6}$/g;


wr.validate = function(re, value) {
  var isvalid = re.test(value);
  re.lastIndex = 0;
  return isvalid;
};


wr.symbolsLogin = function(value) {
  return wr.validate(wr.loginSymbolsRe_, value);
};


wr.formatLogin = function(value) {
  return wr.validate(wr.loginRe_, value);
};


wr.symbolsPassword = function(value) {
  return wr.validate(wr.passwordSymbolsRe_, value);
};


wr.formatPassword = function(value) {
  return wr.validate(wr.passwordRe_, value);
};


wr.symbolsEmail = function(value) {
  return wr.validate(wr.emailSymbolsRe_, value);
};


wr.formatEmail = function(value) {
  return wr.validate(wr.emailRe_, value);
};


wr.symbolsInt = function(value) {
  return wr.validate(wr.intSymbolsRe_, value);
};


wr.formatInt = function(value) {
  return wr.validate(wr.intRe_, value);
};


wr.formatIntOpt = function(value) {
  return wr.validate(wr.intOptRe_, value);
};


wr.symbolsFloat = function(value) {
  return wr.validate(wr.floatSymbolsRe_, value);
};


wr.formatFloat = function(value) {
  return wr.validate(wr.floatRe_, value);
};


wr.formatFloatOpt = function(value) {
  return wr.validate(wr.floatOptRe_, value);
};


wr.symbolsHexColor = function(value) {
  return wr.validate(wr.hexColorSymbolsRe_, value);
}


wr.formatHexColor = function(value) {
  return wr.validate(wr.hexColorRe_, value);
};


wr.symbolsPresent = function(value) {
  var va = wr.trimString(value);
  return va.length > 0;
};
