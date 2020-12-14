"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LiteGA_1 = require("./src/LiteGA");
var Population_1 = require("./src/Population");
var p = new Population_1.Population();
p.generateInitialPopulation([
    { minimum: -10.0, maximum: 10.0, precision: 3 },
    { minimum: -10.0, maximum: 10.0, precision: 3 }
], 50);
var ga = new LiteGA_1.LiteGA(p);
var bestFintness = -1;
var bestSolution = [0, 0];
ga.fitnessCallback = function (variables) {
    var x = variables[0];
    var y = variables[1];
    var value = x * x - 10 * x + y * y - 12 * y + 71;
    var fitness = 1000 + 1 / (1 + value);
    if (fitness > bestFintness) {
        bestSolution = [x, y];
        bestFintness = value;
    }
    return fitness;
};
for (var i = 0; i < 50; i++) {
    ga.Evolve(0.05);
}
console.log("Best solution = " + bestSolution);
//# sourceMappingURL=index.js.map