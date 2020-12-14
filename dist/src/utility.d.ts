/**
 * Utility methods to work with binary values
 */
export declare class Utility {
    /**
     * Converts the given integer into binary string representation
     * @param value An integer to convert
     * @returns A binary string representation
     */
    static toBinary(value: number): string;
    /**
     * Converts the given binary string representation into equivalent integer
     * @param value A string to convert
     * @returns Equivalent integer for the given binary string representation
     */
    static fromBinary(value: string): number;
}
