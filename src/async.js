const inSequence = require('./async/inSequence');
const iterate = require('./async/iterate');

function Async() {
    this.inSequence = inSequence.bind(this);
    this.iterate = iterate.bind(this);
}

module.exports = new Async();