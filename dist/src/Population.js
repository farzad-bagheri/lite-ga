"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Chromosome_1 = require("./Chromosome");
var Utility_1 = require("./Utility");
/**
 * Represents a population object with helper methods
 */
var Population = /** @class */ (function () {
    function Population() {
        /**
         * Array of individuals
         */
        this.individuals = [];
        /**
         * Sum of all individuals' fintenss value
         */
        this.totalFitness = 0;
        /**
         * List of problem variables
         */
        this.variablesDescription = [];
        /**
         * Holds shared details of individuals
         */
        this.chromosomeStructure = { length: 0, bitCounts: [] };
    }
    /**
     * Createas an initial list of individuals for this population
     * @param variablesDescription List of problem variables
     * @param initialPopulationCount Individuals count at initial state. Population count may be changed automatically for next generations
     */
    Population.prototype.generateInitialPopulation = function (variablesDescription, initialPopulationCount) {
        if (initialPopulationCount === void 0) { initialPopulationCount = 50; }
        if (variablesDescription.length === 0) {
            throw new Error('Variables description is empty');
        }
        if (initialPopulationCount < 10 || initialPopulationCount > 500) {
            throw new Error('initial population count is invalid');
        }
        this.variablesDescription = __assign({}, variablesDescription);
        this.chromosomeStructure = Chromosome_1.Chromosome.Describe(variablesDescription);
        var chromosome = new Chromosome_1.Chromosome();
        this.individuals = [];
        for (var i = 0; i < initialPopulationCount; i++) {
            chromosome.SetRandomValue(this.chromosomeStructure.length);
            this.individuals.push({ fitness: 0, bits: chromosome.stringForm });
        }
    };
    /**
     * Sums all fitness values for individuals, required for random selection
     */
    Population.prototype.updateTotalFitness = function () {
        this.totalFitness = 0;
        for (var i = 0; i < this.individuals.length; i++) {
            this.totalFitness += this.individuals[i].fitness;
        }
    };
    /**
     * Selects a random member from population according to its fitness value
     */
    Population.prototype.selectIndividual = function () {
        if (this.totalFitness <= 0) {
            throw new Error('Invalid total fitness value');
        }
        var r = Math.random() * this.totalFitness;
        for (var i = 0; i < this.individuals.length; i++) {
            r -= this.individuals[i].fitness;
            if (r <= 0) {
                return i;
            }
        }
        throw new Error('Unexpeted behaviour in individual selection');
    };
    /**
     * Converts a string of bits to an array of decimals
     * @param bits A string of bits to be converted
     */
    Population.prototype.bitsToValues = function (bits) {
        if (bits.length < 2) {
            throw new Error('Unable to extract values from a too short bit string');
        }
        if (this.chromosomeStructure.bitCounts.length === 0) {
            throw new Error('Chromosome structure for this population is not defined');
        }
        var r = [];
        var base = 0;
        for (var i = 0; i < this.chromosomeStructure.bitCounts.length; i++) {
            var c = this.chromosomeStructure.bitCounts[i];
            var s = bits.substr(base, base + c);
            base += c;
            var delta = this.variablesDescription[i].maximum - this.variablesDescription[i].minimum;
            r.push(this.variablesDescription[i].minimum + Utility_1.Utility.fromBinary(s) * (delta / (Math.pow(2, c) - 1)));
        }
        return r;
    };
    /**
     * Performs crossover
     * @param offspring1 First bits string
     * @param offspring2 Second bits string
     */
    Population.crossover = function (offspring1, offspring2) {
        if (!offspring1 || !offspring2 || offspring1.length < 2) {
            throw new Error('Invalid offspring passed to crossover');
        }
        if (offspring1.length !== offspring2.length) {
            throw new Error('Offspring length must be equal for crossover');
        }
        var r = (Math.random() * (offspring1.length - 1)) | 0;
        if (Math.random() >= 0.5) {
            return offspring2.substr(0, r) + offspring1.substr(r);
        }
        return offspring1.substr(0, r) + offspring2.substr(r);
    };
    /**
     * Performs mutation on an individual
     * @param offspring A bits string to apply mutation
     */
    Population.mutation = function (offspring) {
        if (!offspring || offspring.length < 2) {
            throw new Error('Invalid offspring passed to mutation');
        }
        var r = (Math.random() * (offspring.length - 1)) | 0;
        var replacement = offspring[r] === '0' ? '1' : '0';
        return offspring.substr(0, r) + replacement + offspring.substr(r + 1);
    };
    return Population;
}());
exports.Population = Population;
//# sourceMappingURL=Population.js.map