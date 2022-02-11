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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappedCore = void 0;
// theirs
var lodash_1 = require("lodash");
var ethers_1 = require("ethers");
// types
var misc_1 = require("../../types/misc");
var abi_1 = require("../../abi");
// utils
var common_1 = require("../../common");
var financial_1 = require("../../utils/financial");
var misc_2 = require("../../utils/misc");
var utils_1 = require("../../utils");
var WrappedCore = /** @class */ (function () {
    function WrappedCore(_coreService) {
        this.coreService$ = _coreService;
    }
    // ******** public methods ********
    WrappedCore.prototype.create = function (_derivative, _amount, _positionsOwners, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tokenSpenderAddress, token, requiredMargin, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract.getProtocolAddresses()];
                    case 2:
                        tokenSpenderAddress = _a.sent();
                        token = new ethers_1.Contract(_derivative.token, abi_1.IERC20Abi, this.coreService$.getProvider());
                        return [4 /*yield*/, this.computeDerivativeMargin$(_derivative, _amount)];
                    case 3:
                        requiredMargin = _a.sent();
                        return [4 /*yield*/, token.connect(signer).approve(tokenSpenderAddress.tokenSpender, requiredMargin)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)
                                .create(_derivative, _amount, _positionsOwners, _overrides)];
                    case 5:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    WrappedCore.prototype.createAndMint = function (_derivative, _amount, _positionsOwners, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tokenSpenderAddress, token, requiredMargin, tx, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract.getProtocolAddresses()];
                    case 2:
                        tokenSpenderAddress = _a.sent();
                        token = new ethers_1.Contract(_derivative.token, abi_1.IERC20Abi, this.coreService$.getProvider());
                        return [4 /*yield*/, this.computeDerivativeMargin$(_derivative, _amount)];
                    case 3:
                        requiredMargin = _a.sent();
                        return [4 /*yield*/, token.connect(signer).approve(tokenSpenderAddress.tokenSpender, requiredMargin)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)
                                .createAndMint(_derivative, _amount, _positionsOwners, _overrides)];
                    case 5:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 6:
                        error_1 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_1)) {
                            if ((0, utils_1.pickError)(error_1.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_1.reason));
                            }
                        }
                        if (error_1 instanceof Error) {
                            throw new Error(error_1.message);
                        }
                        throw Error;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.mint = function (_amount, _positionsAddresses, _positionsOwners, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tx, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)
                                .mint(_amount, _positionsAddresses, _positionsOwners, _overrides)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 3:
                        error_2 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_2)) {
                            if ((0, utils_1.pickError)(error_2.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_2.reason));
                            }
                        }
                        if (error_2 instanceof Error) {
                            throw new Error(error_2.message);
                        }
                        throw Error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.redeem = function (_amount, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tx, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)['redeem(address[2],uint256)'](_positionsAddresses, _amount, _overrides)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 3:
                        error_3 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_3)) {
                            if ((0, utils_1.pickError)(error_3.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_3.reason));
                            }
                        }
                        if (error_3 instanceof Error) {
                            throw new Error(error_3.message);
                        }
                        throw Error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.redeemMany = function (_amounts, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tx, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)['redeem(address[2][],uint256[])'](_positionsAddresses, _amounts, _overrides)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 3:
                        error_4 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_4)) {
                            if ((0, utils_1.pickError)(error_4.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_4.reason));
                            }
                        }
                        if (error_4 instanceof Error) {
                            throw new Error(error_4.message);
                        }
                        throw Error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.executeOne = function (_amount, _positionAddress, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tx, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)['execute(address,uint256)'](_positionAddress, _amount, _overrides)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 3:
                        error_5 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_5)) {
                            if ((0, utils_1.pickError)(error_5.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_5.reason));
                            }
                        }
                        if (error_5 instanceof Error) {
                            throw new Error(error_5.message);
                        }
                        throw Error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.executeOneWithAddress = function (_positionOwner, _amount, _positionAddress, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tx, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.coreService$.contract['execute(address,address,uint256)'](_positionOwner, _positionAddress, _amount, _overrides)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 2:
                        error_6 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_6)) {
                            if ((0, utils_1.pickError)(error_6.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_6.reason));
                            }
                        }
                        if (error_6 instanceof Error) {
                            throw new Error(error_6.message);
                        }
                        throw Error;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.executeMany = function (_amounts, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tx, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)['execute(address[],uint256[])'](_positionsAddresses, _amounts, _overrides)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 3:
                        error_7 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_7)) {
                            if ((0, utils_1.pickError)(error_7.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_7.reason));
                            }
                        }
                        if (error_7 instanceof Error) {
                            throw new Error(error_7.message);
                        }
                        throw Error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.executeManyWithAddress = function (_positionOwner, _amounts, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tx, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)['execute(address,address[],uint256[])'](_positionOwner, _positionsAddresses, _amounts, _overrides)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 3:
                        error_8 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_8)) {
                            if ((0, utils_1.pickError)(error_8.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_8.reason));
                            }
                        }
                        if (error_8 instanceof Error) {
                            throw new Error(error_8.message);
                        }
                        throw Error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.cancelOne = function (_positionAddress, _amount, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tx, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)['cancel(address,uint256)'](_positionAddress, _amount, _overrides)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 3:
                        error_9 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_9)) {
                            if ((0, utils_1.pickError)(error_9.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_9.reason));
                            }
                        }
                        if (error_9 instanceof Error) {
                            throw new Error(error_9.message);
                        }
                        throw Error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.cancelMany = function (_amounts, _positionsAddresses, _overrides) {
        if (_overrides === void 0) { _overrides = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signer, tx, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.coreService$.getProvider()];
                    case 1:
                        signer = (_a.sent()).getSigner();
                        return [4 /*yield*/, this.coreService$.contract
                                .connect(signer)['cancel(address[],uint256[])'](_positionsAddresses, _amounts, _overrides)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                    case 3:
                        error_10 = _a.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_10)) {
                            if ((0, utils_1.pickError)(error_10.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_10.reason));
                            }
                        }
                        if (error_10 instanceof Error) {
                            throw new Error(error_10.message);
                        }
                        throw Error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // getters
    WrappedCore.prototype.isDerivativeCancelledByDerivative = function (_derivative) {
        return __awaiter(this, void 0, void 0, function () {
            var derivativeHash;
            return __generator(this, function (_a) {
                try {
                    derivativeHash = (0, financial_1.getDerivativeHash)(_derivative);
                    return [2 /*return*/, this.isDerivativeCancelled$(derivativeHash)];
                }
                catch (error) {
                    if ((0, misc_1.isErrorReasonExplicit)(error)) {
                        if ((0, utils_1.pickError)(error.reason)) {
                            throw new common_1.SDKError((0, utils_1.pickError)(error.reason));
                        }
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw Error;
                }
                return [2 /*return*/];
            });
        });
    };
    WrappedCore.prototype.isDerivativeCancelledByDerivativeHash = function (_derivativeHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.isDerivativeCancelled$(_derivativeHash)];
                }
                catch (error) {
                    if ((0, misc_1.isErrorReasonExplicit)(error)) {
                        if ((0, utils_1.pickError)(error.reason)) {
                            throw new common_1.SDKError((0, utils_1.pickError)(error.reason));
                        }
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw Error;
                }
                return [2 /*return*/];
            });
        });
    };
    WrappedCore.prototype.getDerivativePayoutsByDerivative = function (_derivative) {
        return __awaiter(this, void 0, void 0, function () {
            var derivativeHash;
            return __generator(this, function (_a) {
                try {
                    derivativeHash = (0, financial_1.getDerivativeHash)(_derivative);
                    return [2 /*return*/, this.getDerivativePayouts$(derivativeHash)];
                }
                catch (error) {
                    if ((0, misc_1.isErrorReasonExplicit)(error)) {
                        if ((0, utils_1.pickError)(error.reason)) {
                            throw new common_1.SDKError((0, utils_1.pickError)(error.reason));
                        }
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw Error;
                }
                return [2 /*return*/];
            });
        });
    };
    WrappedCore.prototype.getDerivativePayoutsByDerivativeHash = function (_derivativeHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.getDerivativePayouts$(_derivativeHash)];
                }
                catch (error) {
                    if ((0, misc_1.isErrorReasonExplicit)(error)) {
                        if ((0, utils_1.pickError)(error.reason)) {
                            throw new common_1.SDKError((0, utils_1.pickError)(error.reason));
                        }
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw Error;
                }
                return [2 /*return*/];
            });
        });
    };
    WrappedCore.prototype.getReservesVaultBalance = function (_reseveRecipient, _tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.coreService$.contract.getReservesVaultBalance(_reseveRecipient, _tokenAddress)];
                }
                catch (error) {
                    if ((0, misc_1.isErrorReasonExplicit)(error)) {
                        if ((0, utils_1.pickError)(error.reason)) {
                            throw new common_1.SDKError((0, utils_1.pickError)(error.reason));
                        }
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw Error;
                }
                return [2 /*return*/];
            });
        });
    };
    WrappedCore.prototype.getProtocolAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, error_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = misc_2.struct;
                        _b = lodash_1.omit;
                        return [4 /*yield*/, this.coreService$.contract.getProtocolAddresses()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent(), '__gapOne', '__gapTwo'])])];
                    case 2:
                        error_11 = _c.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_11)) {
                            if ((0, utils_1.pickError)(error_11.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_11.reason));
                            }
                        }
                        if (error_11 instanceof Error) {
                            throw new Error(error_11.message);
                        }
                        throw Error;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WrappedCore.prototype.getProtocolParametersArgs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, error_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = misc_2.struct;
                        _b = lodash_1.omit;
                        return [4 /*yield*/, this.coreService$.contract.getProtocolParametersArgs()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent(), '__gapOne',
                                '__gapTwo',
                                '__gapThree',
                                '__gapFour'])])];
                    case 2:
                        error_12 = _c.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_12)) {
                            if ((0, utils_1.pickError)(error_12.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_12.reason));
                            }
                        }
                        if (error_12 instanceof Error) {
                            throw new Error(error_12.message);
                        }
                        throw Error;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // helpers
    WrappedCore.prototype.computeDerivativeMargin = function (_derivative, _amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.computeDerivativeMargin$(_derivative, _amount)];
                }
                catch (error) {
                    if ((0, misc_1.isErrorReasonExplicit)(error)) {
                        if ((0, utils_1.pickError)(error.reason)) {
                            throw new common_1.SDKError((0, utils_1.pickError)(error.reason));
                        }
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw Error;
                }
                return [2 /*return*/];
            });
        });
    };
    // ******** private methods ********
    WrappedCore.prototype.getDerivativePayouts$ = function (_derivativeHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.coreService$.contract.getDerivativePayouts(_derivativeHash)];
                }
                catch (error) {
                    if ((0, misc_1.isErrorReasonExplicit)(error)) {
                        if ((0, utils_1.pickError)(error.reason)) {
                            throw new common_1.SDKError((0, utils_1.pickError)(error.reason));
                        }
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw Error;
                }
                return [2 /*return*/];
            });
        });
    };
    WrappedCore.prototype.isDerivativeCancelled$ = function (_derivativeHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.coreService$.contract.isDerivativeCancelled(_derivativeHash)];
                }
                catch (error) {
                    if ((0, misc_1.isErrorReasonExplicit)(error)) {
                        if ((0, utils_1.pickError)(error.reason)) {
                            throw new common_1.SDKError((0, utils_1.pickError)(error.reason));
                        }
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw Error;
                }
                return [2 /*return*/];
            });
        });
    };
    WrappedCore.prototype.computeDerivativeMargin$ = function (_derivative, _amount) {
        return __awaiter(this, void 0, void 0, function () {
            var syntheticId, _a, buyerMargin, sellerMargin, error_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        syntheticId = (new ethers_1.Contract(_derivative.syntheticId, abi_1.IDerivativeLogicAbi, this.coreService$.getProvider()));
                        return [4 /*yield*/, syntheticId.getMargin(_derivative)];
                    case 1:
                        _a = _b.sent(), buyerMargin = _a[0], sellerMargin = _a[1];
                        return [2 /*return*/, (0, financial_1.mulDiv)(buyerMargin.add(sellerMargin), _amount)];
                    case 2:
                        error_13 = _b.sent();
                        if ((0, misc_1.isErrorReasonExplicit)(error_13)) {
                            if ((0, utils_1.pickError)(error_13.reason)) {
                                throw new common_1.SDKError((0, utils_1.pickError)(error_13.reason));
                            }
                        }
                        if (error_13 instanceof Error) {
                            throw new Error(error_13.message);
                        }
                        throw Error;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return WrappedCore;
}());
exports.WrappedCore = WrappedCore;
//# sourceMappingURL=wrappedCore.js.map