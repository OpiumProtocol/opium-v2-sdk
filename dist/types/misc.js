"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENetworks = exports.isProvider = void 0;
var isProvider = function (arg) {
    return true;
};
exports.isProvider = isProvider;
var ENetworks;
(function (ENetworks) {
    // GANACHE = "GANACHE",
    ENetworks["GOERLI"] = "GOERLI";
    ENetworks["ARBITRUM_TESTNET"] = "ARBITRUM_TESTNET";
})(ENetworks = exports.ENetworks || (exports.ENetworks = {}));
//# sourceMappingURL=misc.js.map