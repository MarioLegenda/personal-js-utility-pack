const mocha = require('mocha');
const chai = require('chai');
const utility = require('./../../src/utility');
const urlService = require('url');

const describe = mocha.describe;
const after = mocha.after;
const before = mocha.before;
const it = mocha.it;
const fail = chai.fail;
const expect = chai.expect;

it('should return a list of suburls of a domain that follow all urls including external links', (done) => {
    utility.getAllUrls('https://www.creative-tim.com/', (err, list) => {
        if (err) fail(`getAllUrl returns fails with an error: ${err.message}`);

        expect(list).to.be.a('array');
        expect(list.length).to.be.above(1);
        
        for (url of list) {
            expect(url).to.be.a('string');
        }

        done();
    });
});

it('should return a list of suburls of a domain that follow only urls for that domains (no external urls)', (done) => {
    const url = 'https://www.creative-tim.com/';

    utility.getLocalUrls(url, (err, list) => {
        if (err) fail(`getLocalUrls returns fails with an error: ${err.message}`);

        expect(list).to.be.a('array');
        expect(list.length).to.be.above(1);

        for (const item of list) {
            expect(item).to.be.a('string');
            
            const baseHostname = urlService.parse(url).hostname;
            const itemHostname = urlService.parse(item).hostname;

            expect(baseHostname).to.be.equal(itemHostname);
        }

        done();
    });
});