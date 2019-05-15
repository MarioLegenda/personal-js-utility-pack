const inHttpRange = require('../misc/inHttpRange');
const is = require("../misc/is");
const ucFirst = require('../misc/ucFirst');
const range = require('../misc/range');
const loopGenerator = require('../misc/loopGenerator');
const parseHostname = require('../misc/parseHostname');

function Misc() {
    this.inHttpStatusRange = inHttpRange;
    this.is = is;
    this.ucFirst = ucFirst;
    this.range = range;
    this.loopGenerator = loopGenerator;
    this.parseHostname = parseHostname;
}

module.exports = new Misc();