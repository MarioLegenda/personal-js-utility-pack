const url = require('./url/url');
const misc = require('./misc');
const async = require('./async');

function Toolbox() {
    this.url = url;
    this.misc = misc;
    this.async = async;
}

module.exports = new Toolbox();