import { VariableDescription, Variable } from './Variable';

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
export class Chromosome {

    /**
     * String of bits
     */
    stringForm: string = '';

    /**
     * Create a random list of bits
     * @param length Number of bits to create
     */
    public SetRandomValue(length: number) {
        if (length < 2 || length > 4096) {
            throw new Error('Bit count is invalid');
        }
        let s = new Array(length);
        for (let i = 0; i < length; i++) {
            s[i] = Math.random() > 0.5 ? '1' : '0';
        }
        this.stringForm = s.join('');
    }

    /**
     * Creats a chromosome description object based on the variables list 
     * @param variablesDescription List of problem variables
     */
    public static Describe(variablesDescription: VariableDescription[]): ChromosomeDescription {
        if (variablesDescription.length === 0) {
            throw new Error('Variables description is empty');
        }
        let bitCounts: number[] = [];
        let length = 0;
        variablesDescription.forEach(v => {
            const c = Variable.getBitCount(v);
            bitCounts.push(c);
            length += c;
        });
        return { length, bitCounts };
    }
}