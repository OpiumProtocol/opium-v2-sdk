export declare const positionsQuery = "\nquery Positions {\n  positions {\n    id\n    name\n    symbol\n    totalSupply\n  }\n}\n";
export declare const buyersQuery = "\nquery Buyers {\n    buyers {\n        id\n        address\n        p2pVaultBalances {\n            id\n            derivativeHash\n            balance\n        }\n    }\n}\n";
export declare const sellersQuery = "\nquery Sellers {\n    sellers {\n        id\n        address\n        p2pVaultBalances {\n            id\n            derivativeHash\n            balance\n        }\n    }\n}\n";
