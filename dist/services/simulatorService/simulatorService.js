"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorService = void 0;
var utils_1 = require("../../utils");
var SimulatorService = /** @class */ (function () {
    function SimulatorService() {
    }
    SimulatorService.computeDerivativeHash = function (_derivative) {
        return (0, utils_1.getDerivativeHash)(_derivative);
    };
    return SimulatorService;
}());
exports.SimulatorService = SimulatorService;
//# sourceMappingURL=simulatorService.js.map