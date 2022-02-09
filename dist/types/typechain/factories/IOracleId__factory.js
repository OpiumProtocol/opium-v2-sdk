"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOracleId__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [],
        name: "getResult",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var IOracleId__factory = /** @class */ (function () {
    function IOracleId__factory() {
    }
    IOracleId__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    IOracleId__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    IOracleId__factory.abi = _abi;
    return IOracleId__factory;
}());
exports.IOracleId__factory = IOracleId__factory;
//# sourceMappingURL=IOracleId__factory.js.map