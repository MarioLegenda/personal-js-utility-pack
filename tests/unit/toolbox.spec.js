const mocha = require('mocha');
const chai = require('chai');
const toolbox = require('../../src/toolbox');
const urlService = require('url');

const it = mocha.it;
const expect = chai.expect;

it('should pass all misc functions', () => {
    const boolTrue = true;
    const boolFalse = false;
    const string = 'string';
    const number = 1;
    const float = 1.1;
    const stringObj = new String('mile');
    const boolObject = new Boolean(true);
    const array = [];
    const obj = {};
    const objectInst = new Object();
    const func = new Function();

    expect(toolbox.misc.is('boolean', boolTrue)).to.be.true;
    expect(toolbox.misc.is('boolean', boolFalse)).to.be.true;
    expect(toolbox.misc.is('string', string)).to.be.true;
    expect(toolbox.misc.is('integer', number)).to.be.true;
    expect(toolbox.misc.is('float', float)).to.be.true;
    expect(toolbox.misc.is('string', stringObj)).to.be.true;
    expect(toolbox.misc.is('boolean', boolObject)).to.be.true;
    expect(toolbox.misc.is('array', array)).to.be.true;
    expect(toolbox.misc.is('object', obj)).to.be.true;
    expect(toolbox.misc.is('object', objectInst)).to.be.true;
    expect(toolbox.misc.is('function', func)).to.be.true;
})

it('should parse the url into domain parts', () => {
    const url = 'https://developer.mozilla.org/en-US/';

    const parsed = toolbox.url.parseHostname(urlService.parse(url).hostname);
    
    expect(parsed).to.have.property('ext');
    expect(parsed).to.have.property('domainName');
    expect(parsed).to.have.property('fullDomain');
    expect(parsed).to.have.property('subdomains');

    expect(parsed.ext).to.be.a('string');
    expect(parsed.domainName).to.be.a('string');
    expect(parsed.fullDomain).to.be.a('string');
    expect(parsed.subdomains).to.be.a('array');
    expect(parsed.subdomains.length).to.be.above(0);
});