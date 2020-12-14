import { VariableDescription } from './Variable';
import { ChromosomeDescription, Chromosome } from './Chromosome';
import { Utility } from './Utility';

/**
 * Represents a member of population
 */
export interface Individual {
    /**
     * String representation of genes
     */
    bits: string;
    /**
     * Fitness value associated with this solution
     */
    fitness: number;
}

/**
 * Represents a population object with helper methods
 */
export class Population {

    /**
     * Array of individuals
     */
    individuals: Individual[] = [];

    /**
     * Sum of all individuals' fintenss value
     */
    totalFitness = 0;

    /**
     * List of problem variables
     */
    variablesDescription: VariableDescription[] = [];

    /**
     * Holds shared details of individuals 
     */
    chromosomeStructure: ChromosomeDescription = { length: 0, bitCounts: [] };

    /**
     * Createas an initial list of individuals for this population 
     * @param variablesDescription List of problem variables
     * @param initialPopulationCount Individuals count at initial state. Population count may be changed automatically for next generations
     */
    public generateInitialPopulation(variablesDescription: VariableDescription[], initialPopulationCount = 50) {
        if (variablesDescription.length === 0) {
            throw new Error('Variables description is empty');
        }
        if (initialPopulationCount < 10 || initialPopulationCount > 500) {
            throw new Error('initial population count is invalid');
        }
        this.variablesDescription = { ...variablesDescription };
        this.chromosomeStructure = Chromosome.Describe(variablesDescription);
        let chromosome = new Chromosome();
        this.individuals = [];
        for (let i = 0; i < initialPopulationCount; i++) {
            chromosome.SetRandomValue(this.chromosomeStructure.length);
            this.individuals.push({ fitness: 0, bits: chromosome.stringForm });
        }
    }

    /**
     * Sums all fitness values for individuals, required for random selection
     */
    public updateTotalFitness() {
        this.totalFitness = 0;
        for (let i = 0; i < this.individuals.length; i++) {
            this.totalFitness += this.individuals[i].fitness;
        }
    }

    /**
     * Selects a random member from population according to its fitness value
     */
    public selectIndividual(): number {
        if (this.totalFitness <= 0) {
            throw new Error('Invalid total fitness value');
        }
        let r = Math.random() * this.totalFitness;
        for (let i = 0; i < this.individuals.length; i++) {
            r -= this.individuals[i].fitness;
            if (r <= 0) {
                return i;
            }
        }
        throw new Error('Unexpeted behaviour in individual selection');
    }

    /**
     * Converts a string of bits to an array of decimals
     * @param bits A string of bits to be converted
     */
    public bitsToValues(bits: string): number[] {
        if (bits.length < 2) {
            throw new Error('Unable to extract values from a too short bit string');
        }
        if (this.chromosomeStructure.bitCounts.length === 0) {
            throw new Error('Chromosome structure for this population is not defined');
        }
        let r: number[] = [];
        let base = 0;

        for (let i = 0; i < this.chromosomeStructure.bitCounts.length; i++) {
            const c = this.chromosomeStructure.bitCounts[i];
            const s = bits.substr(base, base + c);
            base += c;
            let delta = this.variablesDescription[i].maximum - this.variablesDescription[i].minimum;
            r.push(this.variablesDescription[i].minimum + Utility.fromBinary(s) * (delta / (Math.pow(2, c) - 1)));
        }
        return r;
    }

    /**
     * Performs crossover
     * @param offspring1 First bits string
     * @param offspring2 Second bits string
     */
    public static crossover(offspring1: string, offspring2: string): string {
        if (!offspring1 || !offspring2 || offspring1.length < 2) {
            throw new Error('Invalid offspring passed to crossover');
        }
        if (offspring1.length !== offspring2.length) {
            throw new Error('Offspring length must be equal for crossover');
        }
        let r = (Math.random() * (offspring1.length - 1)) | 0;
        if (Math.random() >= 0.5) {
            return offspring2.substr(0, r) + offspring1.substr(r);
        }
        return offspring1.substr(0, r) + offspring2.substr(r);
    }

    /**
     * Performs mutation on an individual
     * @param offspring A bits string to apply mutation
     */
    public static mutation(offspring: string): string {
        if (!offspring || offspring.length < 2) {
            throw new Error('Invalid offspring passed to mutation');
        }
        let r = (Math.random() * (offspring.length - 1)) | 0;
        let replacement = offspring[r] === '0' ? '1' : '0';
        return offspring.substr(0, r) + replacement + offspring.substr(r + 1);
    }
}