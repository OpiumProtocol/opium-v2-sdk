"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellersQuery = exports.buyersQuery = exports.positionsQuery = void 0;
exports.positionsQuery = "\nquery Positions {\n  positions {\n    id\n    name\n    symbol\n    totalSupply\n  }\n}\n";
exports.buyersQuery = "\nquery Buyers {\n    buyers {\n        id\n        address\n        p2pVaultBalances {\n            id\n            derivativeHash\n            balance\n        }\n    }\n}\n";
exports.sellersQuery = "\nquery Sellers {\n    sellers {\n        id\n        address\n        p2pVaultBalances {\n            id\n            derivativeHash\n            balance\n        }\n    }\n}\n";
//# sourceMappingURL=queries.js.map