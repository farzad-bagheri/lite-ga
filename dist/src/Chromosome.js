"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Variable_1 = require("./Variable");
/**
 * Holds a string of bits
 */
var Chromosome = /** @class */ (function () {
    function Chromosome() {
        /**
         * String of bits
         */
        this.stringForm = '';
    }
    /**
     * Create a random list of bits
     * @param length Number of bits to create
     */
    Chromosome.prototype.SetRandomValue = function (length) {
        if (length < 2 || length > 4096) {
            throw new Error('Bit count is invalid');
        }
        var s = new Array(length);
        for (var i = 0; i < length; i++) {
            s[i] = Math.random() > 0.5 ? '1' : '0';
        }
        this.stringForm = s.join('');
    };
    /**
     * Creats a chromosome description object based on the variables list
     * @param variablesDescription List of problem variables
     */
    Chromosome.Describe = function (variablesDescription) {
        if (variablesDescription.length === 0) {
            throw new Error('Variables description is empty');
        }
        var bitCounts = [];
        var length = 0;
        variablesDescription.forEach(function (v) {
            var c = Variable_1.Variable.getBitCount(v);
            bitCounts.push(c);
            length += c;
        });
        return { length: length, bitCounts: bitCounts };
    };
    return Chromosome;
}());
exports.Chromosome = Chromosome;
//# sourceMappingURL=Chromosome.js.map