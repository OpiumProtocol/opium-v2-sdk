"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
var contracts_1 = require("@ethersproject/contracts");
var ContractService = /** @class */ (function () {
    function ContractService(_address, _abi, _provider) {
        this._address = _address;
        this._abi = _abi;
        this._provider = _provider;
        this.contract = new contracts_1.Contract(this._address, this._abi, _provider);
    }
    ContractService.prototype.getAddress = function () {
        return this._address;
    };
    ContractService.prototype.getProvider = function () {
        return this._provider;
    };
    return ContractService;
}());
exports.ContractService = ContractService;
//# sourceMappingURL=contractService.js.map