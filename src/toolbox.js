const url = require('./url');
const misc = require('./misc');

function Toolbox() {
    this.url = url;
    this.misc = misc;
}

module.exports = new Toolbox();