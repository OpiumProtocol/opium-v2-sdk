"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.registryAddresses = exports.chainIds = void 0;
var types_1 = require("../types");
exports.chainIds = (_a = {},
    _a[types_1.ENetworks.GOERLI] = 5,
    _a[types_1.ENetworks.ARBITRUM_TESTNET] = 421611,
    _a);
// TODO: add proxies?
// implementation addresses
exports.registryAddresses = (_b = {},
    _b[types_1.ENetworks.GOERLI] = "0x6E585aa374D92fEd6CA148EA3e5fB2E2DC53FFB5",
    _b[types_1.ENetworks.ARBITRUM_TESTNET] = "0x7C40069bdC198925007786414343681bceCFd91D",
    _b);
//# sourceMappingURL=networks.js.map