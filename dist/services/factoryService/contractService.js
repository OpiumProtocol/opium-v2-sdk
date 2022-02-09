"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
var ethers_1 = require("ethers");
var ContractService = /** @class */ (function () {
    function ContractService(_address, _abi, _provider) {
        this.address$ = _address;
        this.abi$ = _abi;
        this.provider$ = _provider;
        this.contract = new ethers_1.Contract(this.address$, this.abi$, this.provider$);
    }
    ContractService.prototype.getAddress = function () {
        return this.address$;
    };
    ContractService.prototype.getProvider = function () {
        return this.provider$;
    };
    return ContractService;
}());
exports.ContractService = ContractService;
//# sourceMappingURL=contractService.js.map