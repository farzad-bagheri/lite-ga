/**
 * Utility methods to work with binary values
 */
export class Utility {
    /**
     * Converts the given integer into binary string representation
     * @param value An integer to convert
     * @returns A binary string representation
     */
    public static toBinary(value: number): string {
        return value.toString(2);
    }

    /**
     * Converts the given binary string representation into equivalent integer  
     * @param value A string to convert
     * @returns Equivalent integer for the given binary string representation
     */
    public static fromBinary(value: string): number {
        return parseInt(value, 2);
    }
}