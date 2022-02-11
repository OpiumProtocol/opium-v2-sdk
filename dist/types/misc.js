"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorReasonExplicit = exports.ENetworks = exports.isProvider = void 0;
var isProvider = function (arg) { return true; };
exports.isProvider = isProvider;
var ENetworks;
(function (ENetworks) {
    // GANACHE = "GANACHE",
    ENetworks["GOERLI"] = "GOERLI";
    ENetworks["ARBITRUM_TESTNET"] = "ARBITRUM_TESTNET";
})(ENetworks = exports.ENetworks || (exports.ENetworks = {}));
// type-guard to assert the `.reason` field in an Error object at run-time
var isErrorReasonExplicit = function (error) { return error && error.reason; };
exports.isErrorReasonExplicit = isErrorReasonExplicit;
//# sourceMappingURL=misc.js.map