const misc = require('./misc');

function Url() {
    function parseHostname(hostname) {
        if (!misc.is('string', hostname)) return null;

        const parts = hostname.split('.');

        const domain = parts.splice(-2, 2);

        const domainExt = domain[1].replace(/[\#|\/].*/, '');

        return {
            ext: domainExt,
            domainName: domain[0],
            fullDomain: `${domain[0]}.${domainExt}`,
            subdomains: (parts.length === 0) ? null : parts,
        }
    }

    this.parseHostname = parseHostname;
}

module.exports = new Url();