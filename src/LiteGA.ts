import { Population } from './Population';

/**
 * Genetic Algorithm Engine
 */
export class LiteGA {

    /**
     * Fitness callback which returns a positive float for the given solution
     * @param variables An array of decimals to be evaluated
     * @returns A positive float, higher values indicate a better solution
     */
    public fitnessCallback = (variables: number[]) => { return 0 }

    /**
     * 
     * @param population Initial population to start with
     */
    constructor(private population: Population) {
        if (!population || population.individuals.length === 0) {
            throw new Error('Initial population is empty');
        }
    }

    /**
     * Performs one step and updates the current population
     * @param mutationProbability Probability at which mutation may occur
     */
    public Evolve(mutationProbability: number = 0.05) {
        for (let i = 0; i < this.population.individuals.length; i++) {
            let values = this.population.bitsToValues(this.population.individuals[i].bits);
            this.population.individuals[i].fitness = this.fitnessCallback(values);
        }
        this.population.updateTotalFitness();
        if (this.population.totalFitness <= 0) {
            throw new Error('Total fitness is invalid');
        }
        let newPopulation = new Population();
        newPopulation.chromosomeStructure = { ...this.population.chromosomeStructure };
        newPopulation.variablesDescription = { ...this.population.variablesDescription };
        while (newPopulation.individuals.length < this.population.individuals.length) {
            const i1 = this.population.selectIndividual();
            const i2 = this.population.selectIndividual();
            if (i1 === i2) continue;
            const offspring = Population.crossover(this.population.individuals[i1].bits, this.population.individuals[i2].bits);
            newPopulation.individuals.push({ fitness: 0, bits: this.population.individuals[i1].bits });
            newPopulation.individuals.push({ fitness: 0, bits: this.population.individuals[i2].bits });
            newPopulation.individuals.push({ fitness: 0, bits: offspring });
        }
        for (let i = 0; i < newPopulation.individuals.length; i++) {
            if (Math.random() <= mutationProbability) {
                newPopulation.individuals[i].bits = Population.mutation(newPopulation.individuals[i].bits);
            }
        }
        this.population = newPopulation;
    }
}