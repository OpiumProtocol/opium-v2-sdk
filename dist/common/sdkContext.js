"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDKContext = void 0;
var ethers_1 = require("ethers");
var misc_1 = require("../utils/misc");
var sdkError_1 = require("./sdkError");
var constants_1 = require("../constants");
var SDKContext = /** @class */ (function () {
    function SDKContext(_config) {
        this.chainId$ = _config.chainId;
        if (_config.override) {
            this.provider$ = new ethers_1.providers.Web3Provider(_config.override);
        }
        else {
            this.provider$ = new ethers_1.providers.JsonRpcProvider(_config.rpcUrl);
        }
        var networkConfig = (0, misc_1.configByChain)(constants_1.chainIds, _config.chainId);
        if (!networkConfig) {
            throw new sdkError_1.SDKError(constants_1.sdkErrors.UNSUPPORTED_CHAIN);
        }
        else {
            this.networkConfig$ = networkConfig;
        }
    }
    SDKContext.prototype.getProvider = function () {
        return this.provider$;
    };
    SDKContext.prototype.getChainId = function () {
        return this.chainId$;
    };
    SDKContext.prototype.getNetworkConfig = function () {
        return this.networkConfig$;
    };
    return SDKContext;
}());
exports.SDKContext = SDKContext;
//# sourceMappingURL=sdkContext.js.map