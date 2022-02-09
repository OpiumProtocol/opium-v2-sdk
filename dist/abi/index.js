"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILiveFeedOracleIdABI = exports.IERC20Abi = exports.IDerivativeLogicAbi = exports.SyntheticAggregatorABI = exports.OracleAggregatorABI = exports.CoreABI = exports.RegistryABI = void 0;
var Registry_json_1 = __importDefault(require("./protocol-v2/Registry.json"));
var Core_json_1 = __importDefault(require("./protocol-v2/Core.json"));
var OracleAggregator_json_1 = __importDefault(require("./protocol-v2/OracleAggregator.json"));
var SyntheticAggregator_json_1 = __importDefault(require("./protocol-v2/SyntheticAggregator.json"));
var IDerivativeLogic_json_1 = __importDefault(require("./protocol-v2/IDerivativeLogic.json"));
var IERC20_json_1 = __importDefault(require("./protocol-v2/IERC20.json"));
var ILiveFeedOracleId_json_1 = __importDefault(require("./products-v2/ILiveFeedOracleId.json"));
// protocol
exports.RegistryABI = Registry_json_1.default;
exports.CoreABI = Core_json_1.default;
exports.OracleAggregatorABI = OracleAggregator_json_1.default;
exports.SyntheticAggregatorABI = SyntheticAggregator_json_1.default;
exports.IDerivativeLogicAbi = IDerivativeLogic_json_1.default;
exports.IERC20Abi = IERC20_json_1.default;
// products
exports.ILiveFeedOracleIdABI = ILiveFeedOracleId_json_1.default;
//# sourceMappingURL=index.js.map