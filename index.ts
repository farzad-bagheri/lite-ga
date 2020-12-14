
import { LiteGA } from './src/LiteGA';
import { Population } from './src/Population';

let p = new Population();
p.generateInitialPopulation([
    { minimum: -10.0, maximum: 10.0, precision: 3 },
    { minimum: -10.0, maximum: 10.0, precision: 3 }
], 50);

let ga = new LiteGA(p);

let bestFintness = -1;
let bestSolution = [0, 0];

ga.fitnessCallback = (variables: number[]) => {
    let x = variables[0];
    let y = variables[1];

    let value = x * x - 10 * x + y * y - 12 * y + 71;
    let fitness = 1000 + 1 / (1 + value);
    if (fitness > bestFintness) {
        bestSolution = [x, y];
        bestFintness = value;
    }
    return fitness;
};

for (let i = 0; i < 50; i++) {
    ga.Evolve(0.05);
}

console.log(`Best solution = ${bestSolution}`);


