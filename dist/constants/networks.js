"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.subgraphEndpoints = exports.registryAddresses = exports.chainIds = void 0;
var types_1 = require("../types");
exports.chainIds = (_a = {},
    _a[types_1.ENetworks.GOERLI] = 5,
    _a[types_1.ENetworks.ARBITRUM_TESTNET] = 421611,
    _a);
// proxy addresses
exports.registryAddresses = (_b = {},
    _b[types_1.ENetworks.GOERLI] = '0x7A667f935f767CbcBBd3B005a38C13448BfFEA70',
    _b[types_1.ENetworks.ARBITRUM_TESTNET] = '0x9285CAA6F92D9Ba197966E854174e9B27B2061e5',
    _b);
// proxy addresses
exports.subgraphEndpoints = (_c = {},
    _c[types_1.ENetworks.GOERLI] = '',
    _c[types_1.ENetworks.ARBITRUM_TESTNET] = 'https://api.thegraph.com/subgraphs/name/riccardobiosas/opium-v2-subgraph',
    _c);
//# sourceMappingURL=networks.js.map