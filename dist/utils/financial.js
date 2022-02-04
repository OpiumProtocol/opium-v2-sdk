"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.derivativeFactory = exports.getDerivativeHash = exports.mulDiv = void 0;
var ethers_1 = require("ethers");
var _1 = require(".");
var constants_1 = require("../constants");
var mulDiv = function (amountX, amountY, scalingFactor) {
    if (scalingFactor === void 0) { scalingFactor = ethers_1.utils.parseUnits("1", 18); }
    var result = (0, _1.cast)(amountX).mul((0, _1.cast)(amountY));
    return result.div(scalingFactor);
};
exports.mulDiv = mulDiv;
var getDerivativeHash = function (derivative) {
    return ethers_1.utils.solidityKeccak256(["uint256", "uint256", "uint256[]", "address", "address", "address"], [
        derivative.margin,
        derivative.endTime,
        derivative.params,
        derivative.oracleId,
        derivative.token,
        derivative.syntheticId,
    ]);
};
exports.getDerivativeHash = getDerivativeHash;
var derivativeFactory = function (derivative) {
    var def = {
        margin: (0, _1.toBN)("0"),
        endTime: 0,
        params: [],
        oracleId: constants_1.zeroAddress,
        token: constants_1.zeroAddress,
        syntheticId: constants_1.zeroAddress,
    };
    return __assign(__assign({}, def), derivative);
};
exports.derivativeFactory = derivativeFactory;
//# sourceMappingURL=financial.js.map