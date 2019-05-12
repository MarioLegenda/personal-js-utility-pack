const inHttpRange = require('./misc/inHttpRange');
const is = require("./misc/is");
const ucFirst = require('./misc/ucFirst');
const range = require('./misc/range');

function Misc() {
    this.inHttpStatusRange = inHttpRange;
    this.is = is;
    this.ucFirst = ucFirst;
    this.range = range;
}

module.exports = new Misc();