const sharedPrototype = require('../inheritance/sharedPrototype');
const classical = require('../inheritance/classical');

function RollingStones() {
    this.sharedPrototype = sharedPrototype;
    this.classical = classical;
}

module.exports = new RollingStones();