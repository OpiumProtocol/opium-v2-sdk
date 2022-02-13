"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
var ethers_1 = require("ethers");
var ContractService = /** @class */ (function () {
    function ContractService(_sdkCtx, _address, _abi) {
        this.sdkCtx = _sdkCtx;
        this.address$ = _address;
        this.abi$ = _abi;
        this.contract = new ethers_1.Contract(this.address$, this.abi$, this.sdkCtx.getProvider());
    }
    ContractService.prototype.getAddress = function () {
        return this.address$;
    };
    return ContractService;
}());
exports.ContractService = ContractService;
//# sourceMappingURL=contractService.js.map