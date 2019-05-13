const ucFirst = require('./ucFirst');

module.exports = function (type, val) {
  const res = `[object ${ucFirst(type)}]`;

  if (type === "float") {
    return val === +val && val !== (val | 0);
  }

  if (type.toLowerCase() === "nan") {
    return val !== val;
  }

  return Object.prototype.toString.call(val) === res;
};