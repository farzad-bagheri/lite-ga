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
export class Variable {
    /**
     * Validates the given variable description object
     * @param description A description object to check
     * @throws Error
     */
    public static validateDescription(description: VariableDescription) {
        if (description.maximum <= description.minimum) {
            throw new Error('Variable maximum is less than or equal to its minimum');
        }
        if (description.precision < 0 || description.precision > 10) {
            throw new Error('Variable precision is invalid');
        }
    }

    /**
     * Calculates the required number of bits according to the given variable description
     * @param description A description object to extract info from
     * @returns Number of required bits
     */
    public static getBitCount(description: VariableDescription): number {
        const d = (description.maximum - description.minimum) * Math.pow(10, description.precision);
        const m = Math.log(d + 1) / Math.log(2);
        return (m | 0) + 1;
    }
}