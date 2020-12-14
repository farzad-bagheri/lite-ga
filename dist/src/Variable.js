"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provides static utility methods to work with a variable
 */
var Variable = /** @class */ (function () {
    function Variable() {
    }
    /**
     * Validates the given variable description object
     * @param description A description object to check
     * @throws Error
     */
    Variable.validateDescription = function (description) {
        if (description.maximum <= description.minimum) {
            throw new Error('Variable maximum is less than or equal to its minimum');
        }
        if (description.precision < 0 || description.precision > 10) {
            throw new Error('Variable precision is invalid');
        }
    };
    /**
     * Calculates the required number of bits according to the given variable description
     * @param description A description object to extract info from
     * @returns Number of required bits
     */
    Variable.getBitCount = function (description) {
        var d = (description.maximum - description.minimum) * Math.pow(10, description.precision);
        var m = Math.log(d + 1) / Math.log(2);
        return (m | 0) + 1;
    };
    return Variable;
}());
exports.Variable = Variable;
//# sourceMappingURL=Variable.js.map