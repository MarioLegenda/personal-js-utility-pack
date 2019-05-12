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

    if (type.toLowerCase() === 'nan') {
        return val !== val;
    }

    return Object.prototype.toString.call(val) === res;
};

function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

function range(start, end, step) {
    if (!is('number', start)) throw new Error('range() invalid argument. First argument must be a number');
    if (!is('number', end)) throw new Error('range() invalid argument. Second argument must be a number');

    if (end < start) throw new Error(`range() invalid argument. 'end' cannot be lower than 'start'`);
    if (start === end) return [];

    let iterations = end - start;
    let isNegative = Math.sign(start);

    if (!step) {
        return [...Array(iterations + 1).keys()].map(i => i + start);
    }

    const result = [];

    while((iterations--) >= 0) {
        if (step) {
            if (isNegative === -1) {
                if ((start % step) === 0) {
                    result.push(start);
                }
            } else if (start !== 0 && (start % step) === 0) {
                result.push(start);
            }
        } else {
            result.push(start);
        }

        ++start;
    }

    return result;
}

function Misc() {
    this.inHttpStatusRange = inHttpRange;
    this.is = is;
    this.ucFirst = ucFirst;
    this.range = range;
}

module.exports = new Misc();