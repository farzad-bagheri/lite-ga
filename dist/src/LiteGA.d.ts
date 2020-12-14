import { Population } from './Population';
/**
 * Genetic Algorithm Engine
 */
export declare class LiteGA {
    private population;
    /**
     * Fitness callback which returns a positive float for the given solution
     * @param variables An array of decimals to be evaluated
     * @returns A positive float, higher values indicate a better solution
     */
    fitnessCallback: (variables: number[]) => number;
    /**
     *
     * @param population Initial population to start with
     */
    constructor(population: Population);
    /**
     * Performs one step and updates the current population
     * @param mutationProbability Probability at which mutation may occur
     */
    Evolve(mutationProbability?: number): void;
}
