const inHttpRange = require('./misc/inHttpRange');
const is = require("./misc/is");
const ucFirst = require('./misc/ucFirst');
const range = require('./misc/range');
const loopGenerator = require('./misc/loopGenerator');

function Misc() {
    this.inHttpStatusRange = inHttpRange;
    this.is = is;
    this.ucFirst = ucFirst;
    this.range = range;
    this.loopGenerator = loopGenerator;
}

module.exports = new Misc();