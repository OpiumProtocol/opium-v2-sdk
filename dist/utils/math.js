"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cast = exports.fromBN = exports.toBN = void 0;
var ethers_1 = require("ethers");
var toBN = function (value) { return ethers_1.ethers.utils.parseEther(value); };
exports.toBN = toBN;
var fromBN = function (value) { return ethers_1.ethers.utils.formatEther(value); };
exports.fromBN = fromBN;
var cast = function (x) { return ethers_1.BigNumber.from(x); };
exports.cast = cast;
//# sourceMappingURL=math.js.map