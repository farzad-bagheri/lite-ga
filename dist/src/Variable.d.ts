/**
 * Describes a variable of type decimal
 */
export interface VariableDescription {
    minimum: number;
    maximum: number;
    /**
     * [0-10]
     */
    precision: number;
}
/**
 * Provides static utility methods to work with a variable
 */
export declare class Variable {
    /**
     * Validates the given variable description object
     * @param description A description object to check
     * @throws Error
     */
    static validateDescription(description: VariableDescription): void;
    /**
     * Calculates the required number of bits according to the given variable description
     * @param description A description object to extract info from
     * @returns Number of required bits
     */
    static getBitCount(description: VariableDescription): number;
}
