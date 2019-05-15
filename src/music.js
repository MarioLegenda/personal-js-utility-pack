const ladyGaga = require('./packages/ladyGaga');
const billieHoliday = require('./packages/billieHoliday');

function Music() {
    this.ladyGaga = ladyGaga;
    this.billieHoliday = billieHoliday;
}

module.exports = new Music();