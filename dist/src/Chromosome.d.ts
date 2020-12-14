import { VariableDescription } from './Variable';
/**
 * Describes a chromosome
 */
export interface ChromosomeDescription {
    /**
     * Total sum of bit counts
     */
    length: number;
    /**
     * Specifies bits count associated with each variable in the chromosome
     */
    bitCounts: number[];
}
/**
 * Holds a string of bits
 */
export declare class Chromosome {
    /**
     * String of bits
     */
    stringForm: string;
    /**
     * Create a random list of bits
     * @param length Number of bits to create
     */
    SetRandomValue(length: number): void;
    /**
     * Creats a chromosome description object based on the variables list
     * @param variablesDescription List of problem variables
     */
    static Describe(variablesDescription: VariableDescription[]): ChromosomeDescription;
}
