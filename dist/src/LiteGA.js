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
var Population_1 = require("./Population");
/**
 * Genetic Algorithm Engine
 */
var LiteGA = /** @class */ (function () {
    /**
     *
     * @param population Initial population to start with
     */
    function LiteGA(population) {
        this.population = population;
        /**
         * Fitness callback which returns a positive float for the given solution
         * @param variables An array of decimals to be evaluated
         * @returns A positive float, higher values indicate a better solution
         */
        this.fitnessCallback = function (variables) { return 0; };
        if (!population || population.individuals.length === 0) {
            throw new Error('Initial population is empty');
        }
    }
    /**
     * Performs one step and updates the current population
     * @param mutationProbability Probability at which mutation may occur
     */
    LiteGA.prototype.Evolve = function (mutationProbability) {
        if (mutationProbability === void 0) { mutationProbability = 0.05; }
        for (var i = 0; i < this.population.individuals.length; i++) {
            var values = this.population.bitsToValues(this.population.individuals[i].bits);
            this.population.individuals[i].fitness = this.fitnessCallback(values);
        }
        this.population.updateTotalFitness();
        if (this.population.totalFitness <= 0) {
            throw new Error('Total fitness is invalid');
        }
        var newPopulation = new Population_1.Population();
        newPopulation.chromosomeStructure = __assign({}, this.population.chromosomeStructure);
        newPopulation.variablesDescription = __assign({}, this.population.variablesDescription);
        while (newPopulation.individuals.length < this.population.individuals.length) {
            var i1 = this.population.selectIndividual();
            var i2 = this.population.selectIndividual();
            if (i1 === i2)
                continue;
            var offspring = Population_1.Population.crossover(this.population.individuals[i1].bits, this.population.individuals[i2].bits);
            newPopulation.individuals.push({ fitness: 0, bits: this.population.individuals[i1].bits });
            newPopulation.individuals.push({ fitness: 0, bits: this.population.individuals[i2].bits });
            newPopulation.individuals.push({ fitness: 0, bits: offspring });
        }
        for (var i = 0; i < newPopulation.individuals.length; i++) {
            if (Math.random() <= mutationProbability) {
                newPopulation.individuals[i].bits = Population_1.Population.mutation(newPopulation.individuals[i].bits);
            }
        }
        this.population = newPopulation;
    };
    return LiteGA;
}());
exports.LiteGA = LiteGA;
//# sourceMappingURL=LiteGA.js.map