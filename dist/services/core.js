"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreContract = void 0;
var lodash_1 = require("lodash");
var contracts_1 = require("@ethersproject/contracts");
var financial_1 = require("../utils/financial");
var misc_1 = require("../utils/misc");
var financial_2 = require("../utils/financial");
var IERC20_json_1 = __importDefault(require("../abi/IERC20.json"));
var IDerivativeLogic_json_1 = __importDefault(require("../abi/IDerivativeLogic.json"));
var CoreContract = /** @class */ (function () {
    function CoreContract(_coreService) {
        this._coreService = _coreService;
        this._core = _coreService.contract;
    }
    // ******** public methods ********
    CoreContract.prototype.create = function (_derivative, _amount, _positionsOwners, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tokenSpenderAddress, token, requiredMargin, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core.getProtocolAddresses()];
                    case 1:
                        tokenSpenderAddress = _a.sent();
                        token = (new contracts_1.Contract(_derivative.token, IERC20_json_1.default.abi, this._coreService.getProvider()));
                        return [4 /*yield*/, this._computeDerivativeMargin(_derivative, _amount)];
                    case 2:
                        requiredMargin = _a.sent();
                        return [4 /*yield*/, token.approve(tokenSpenderAddress.tokenSpender, requiredMargin)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._core.create(_derivative, _amount, _positionsOwners)];
                    case 4:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.createAndMint = function (_derivative, _amount, _positionsOwners, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tokenSpenderAddress, token, SyntheticIdContract, requiredMargin, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core.getProtocolAddresses()];
                    case 1:
                        tokenSpenderAddress = _a.sent();
                        token = (new contracts_1.Contract(_derivative.token, IERC20_json_1.default.abi, this._coreService.getProvider()));
                        SyntheticIdContract = (new contracts_1.Contract(_derivative.syntheticId, IDerivativeLogic_json_1.default, this._coreService.getProvider()));
                        return [4 /*yield*/, this._computeDerivativeMargin(_derivative, _amount)];
                    case 2:
                        requiredMargin = _a.sent();
                        return [4 /*yield*/, token.approve(tokenSpenderAddress.tokenSpender, requiredMargin)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._core.createAndMint(_derivative, _amount, _positionsOwners, _overrides)];
                    case 4:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.mint = function (_amount, _positionsAddresses, _positionsOwners, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core.mint(_amount, _positionsAddresses, _positionsOwners, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.redeem = function (_amount, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core["redeem(address[2],uint256)"](_positionsAddresses, _amount, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.redeemMany = function (_amounts, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core["redeem(address[2][],uint256[])"](_positionsAddresses, _amounts, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.executeOne = function (_amount, _positionAddress, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core["execute(address,uint256)"](_positionAddress, _amount, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.executeOneWithAddress = function (_positionOwner, _amount, _positionAddress, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core["execute(address,address,uint256)"](_positionOwner, _positionAddress, _amount, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.executeMany = function (_amounts, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core["execute(address[],uint256[])"](_positionsAddresses, _amounts, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.executeManyWithAddress = function (_positionOwner, _amounts, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core["execute(address,address[],uint256[])"](_positionOwner, _positionsAddresses, _amounts, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.cancelOne = function (_positionAddress, _amount, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core["cancel(address,uint256)"](_positionAddress, _amount, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    CoreContract.prototype.cancelMany = function (_amounts, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._core["cancel(address[],uint256[])"](_positionsAddresses, _amounts, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    // getters
    CoreContract.prototype.isDerivativeCancelledByDerivative = function (_derivative) {
        return __awaiter(this, void 0, void 0, function () {
            var derivativeHash;
            return __generator(this, function (_a) {
                derivativeHash = (0, financial_2.getDerivativeHash)(_derivative);
                return [2 /*return*/, this._isDerivativeCancelled(derivativeHash)];
            });
        });
    };
    CoreContract.prototype.isDerivativeCancelledByDerivativeHash = function (_derivativeHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._isDerivativeCancelled(_derivativeHash)];
            });
        });
    };
    CoreContract.prototype.getDerivativePayoutsByDerivative = function (_derivative) {
        return __awaiter(this, void 0, void 0, function () {
            var derivativeHash;
            return __generator(this, function (_a) {
                derivativeHash = (0, financial_2.getDerivativeHash)(_derivative);
                return [2 /*return*/, this._getDerivativePayouts(derivativeHash)];
            });
        });
    };
    CoreContract.prototype.getDerivativePayoutsByDerivativeHash = function (_derivativeHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._getDerivativePayouts(_derivativeHash)];
            });
        });
    };
    CoreContract.prototype.getReservesVaultBalance = function (_reseveRecipient, _tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._core.getReservesVaultBalance(_reseveRecipient, _tokenAddress)];
            });
        });
    };
    CoreContract.prototype.getProtocolAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = misc_1.struct;
                        _b = lodash_1.omit;
                        return [4 /*yield*/, this._core.getProtocolAddresses()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent(), "__gapOne", "__gapTwo"])])];
                }
            });
        });
    };
    CoreContract.prototype.getProtocolParametersArgs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = misc_1.struct;
                        _b = lodash_1.omit;
                        return [4 /*yield*/, this._core.getProtocolParametersArgs()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent(), "__gapOne",
                                "__gapTwo",
                                "__gapThree",
                                "__gapFour"])])];
                }
            });
        });
    };
    // helpers
    CoreContract.prototype.computeDerivativeMargin = function (_derivative, _amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._computeDerivativeMargin(_derivative, _amount)];
            });
        });
    };
    // ******** private methods ********
    CoreContract.prototype._getDerivativePayouts = function (_derivativeHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._core.getDerivativePayouts(_derivativeHash)];
            });
        });
    };
    CoreContract.prototype._isDerivativeCancelled = function (_derivativeHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._core.isDerivativeCancelled(_derivativeHash)];
            });
        });
    };
    CoreContract.prototype._computeDerivativeMargin = function (_derivative, _amount) {
        return __awaiter(this, void 0, void 0, function () {
            var syntheticId, _a, buyerMargin, sellerMargin;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        syntheticId = (new contracts_1.Contract(_derivative.syntheticId, IDerivativeLogic_json_1.default, this._coreService.getProvider()));
                        return [4 /*yield*/, syntheticId.getMargin(_derivative)];
                    case 1:
                        _a = _b.sent(), buyerMargin = _a[0], sellerMargin = _a[1];
                        return [2 /*return*/, (0, financial_1.mulDiv)(buyerMargin.add(sellerMargin), _amount)];
                }
            });
        });
    };
    return CoreContract;
}());
exports.CoreContract = CoreContract;
//# sourceMappingURL=core.js.map