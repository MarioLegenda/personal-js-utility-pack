function inHttpRange(val, first, second) {
    return val >= first && val <= second;
};

function is(type, val) {
    const res = `[object ${ucFirst(type)}]`;

    if (type === 'integer') {
        return Number.isInteger(val);
    }

    if (type === 'array') {
        return Array.isArray(val);
    }

    if (type === 'float') {
        return val === +val && val !== (val | 0);

    }

    return Object.prototype.toString.call(val) === res;
};

function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

function Misc() {
    this.inHttpStatusRange = inHttpRange;
    this.is = is;
    this.ucFirst = ucFirst;
}

module.exports = new Misc();