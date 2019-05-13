const inSequence = require('./async/inSequence');
const iterate = require("./async/iterate");
const limitedSequentailQueue = require('./async/limitedSequentailQueue');

function Async() {
    this.inSequence = inSequence.bind(this);
    this.iterate = iterate.bind(this);
    this.limitedSequentailQueue = limitedSequentailQueue;
}

module.exports = new Async();