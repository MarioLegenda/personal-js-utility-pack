const request = require('request');
const cheerio = require('cheerio');
const urlService = require('url');

function extractUrls(body) {
    const loadedCheerio = cheerio.load(body);

    const links = [];
    loadedCheerio('a').each((index, el) => {
        links.push(loadedCheerio(el).attr('href'));
    });

    return links;
}

module.exports.getAllUrls = function(url, callback) {
    return request(url, (err, response, body) => {
        if (err) return callback(err, null);

        callback(null, extractUrls(body));
    });
}

module.exports.getLocalUrls = function(url, callback) {
    const hostname = urlService.parse(url).hostname;

    return request(url, (err, response, body) => {
        if (err) return callback(err, null);

        const urls = extractUrls(body);

        callback(null, urls.filter((val, index) => hostname === urlService.parse(val).hostname));
    });
}