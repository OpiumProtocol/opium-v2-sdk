"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.structArray = exports.struct = exports.configByChain = void 0;
var bignumber_1 = require("@ethersproject/bignumber/lib/bignumber");
var lodash_1 = require("lodash");
var constants_1 = require("../constants");
var configByChain = function (chainIds, chainId) {
    var network = (0, lodash_1.findKey)(chainIds, function (id) { return id === chainId; });
    if (network) {
        return {
            registryAddress: constants_1.registryAddresses[network],
            subgraphEndpoint: constants_1.subgraphEndpoints[network],
        };
    }
    return undefined;
};
exports.configByChain = configByChain;
// TODO (mine): polish yearn code with generics to improve type-safety
/**
 *
 *
 * below: taken from yearn
 */
// convert tuples
function struct(tuple) {
    if (typeof tuple !== 'object')
        return tuple;
    var keys = Object.keys(tuple);
    // check if tuple is actually an array
    // [1, 2, 3] => array vs [1, 2, 3, "a": 1, "b": 2, "c": 3] => object
    // NOTE: [] are not picked up as array (see *)
    var properties = keys.filter(function (key) { return isNaN(Number(key)); });
    if (properties.length === 0)
        return structArray(tuple);
    var copy = {};
    properties.forEach(function (property) {
        var value = tuple[property];
        if (typeof value === 'object' && !(0, bignumber_1.isBigNumberish)(value)) {
            // recursive!
            copy[property] = struct(value);
        }
        else if (Array.isArray(value)) {
            // (*) all empty arrays are picked up here
            copy[property] = value;
        }
        else if ((0, bignumber_1.isBigNumberish)(value)) {
            // all BigNumbers are converted to strings
            copy[property] = value.toString();
        }
        else {
            copy[property] = value;
        }
    });
    return copy;
}
exports.struct = struct;
// convert arrays
function structArray(tuples) {
    return tuples.map(function (tuple) { return struct(tuple); });
}
exports.structArray = structArray;
//# sourceMappingURL=misc.js.map