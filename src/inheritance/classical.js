const is = require('../misc/is');

/**
 * This iheritance pattern makes all objects created with the same prototype share the same prototype.
 * That means when one object changes the prototype (some property for example), it will be changed
 * for all instances that inherit from this prototype so keep that in mind. 
 */

module.exports = function(parent, child) {
    if (!is('function', parent)) throw new Error(`classical() invalid argument. Both 'parent' and 'child' argument must be functions`);
    if (!is('function', child)) throw new Error(`classical() invalid argument. Both 'parent' and 'child' argument must be functions`);

    const tmp = function () {}
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
}