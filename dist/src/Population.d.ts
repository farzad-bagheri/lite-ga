import { VariableDescription } from './Variable';
import { ChromosomeDescription } from './Chromosome';
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
export declare class Population {
    /**
     * Array of individuals
     */
    individuals: Individual[];
    /**
     * Sum of all individuals' fintenss value
     */
    totalFitness: number;
    /**
     * List of problem variables
     */
    variablesDescription: VariableDescription[];
    /**
     * Holds shared details of individuals
     */
    chromosomeStructure: ChromosomeDescription;
    /**
     * Createas an initial list of individuals for this population
     * @param variablesDescription List of problem variables
     * @param initialPopulationCount Individuals count at initial state. Population count may be changed automatically for next generations
     */
    generateInitialPopulation(variablesDescription: VariableDescription[], initialPopulationCount?: number): void;
    /**
     * Sums all fitness values for individuals, required for random selection
     */
    updateTotalFitness(): void;
    /**
     * Selects a random member from population according to its fitness value
     */
    selectIndividual(): number;
    /**
     * Converts a string of bits to an array of decimals
     * @param bits A string of bits to be converted
     */
    bitsToValues(bits: string): number[];
    /**
     * Performs crossover
     * @param offspring1 First bits string
     * @param offspring2 Second bits string
     */
    static crossover(offspring1: string, offspring2: string): string;
    /**
     * Performs mutation on an individual
     * @param offspring A bits string to apply mutation
     */
    static mutation(offspring: string): string;
}
