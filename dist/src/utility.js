"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility methods to work with binary values
 */
var Utility = /** @class */ (function () {
    function Utility() {
    }
    /**
     * Converts the given integer into binary string representation
     * @param value An integer to convert
     * @returns A binary string representation
     */
    Utility.toBinary = function (value) {
        return value.toString(2);
    };
    /**
     * Converts the given binary string representation into equivalent integer
     * @param value A string to convert
     * @returns Equivalent integer for the given binary string representation
     */
    Utility.fromBinary = function (value) {
        return parseInt(value, 2);
    };
    return Utility;
}());
exports.Utility = Utility;
//# sourceMappingURL=Utility.js.map