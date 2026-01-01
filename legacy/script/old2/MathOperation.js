export default class MathOperation { // コンストラクタを設定し直す
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
    }

    addition(previous, current) {
        return previous + current;
    }

    subtract(previous, current) {
        return previous - current;
    }

    multiply(previous, current) {
        return previous * current;
    }

    divide(previous, current) {
        if (current === 0) {
            errorMessages('divideByZero'); //!
            throw new Error("0で除算はできません");
        }

        return previous / current;
    }

    percent() {
        return 0.01 * parseFloat(this.currentOperand);
    }

    plusOrMinus() {
        return -1 * parseFloat(this.currentOperand);
    }

    exponentiation(exponent) {
        return Math.pow(parseFloat(this.currentOperand), exponent);
    }

    powerOf10() {
        return Math.pow(10, parseFloat(this.currentOperand));
    }

    squareRoot() {
        return Math.sqrt(parseFloat(this.currentOperand));
    }

    cubedRoot() {
        return Math.cbrt(parseFloat(this.currentOperand));
    }

    napier() {
        return Math.E * parseFloat(this.currentOperand);
    }

    napierExp() {
        return Math.exp(parseFloat(this.currentOperand));
    }

    reciprocal() {
        return 1 / parseFloat(this.currentOperand);
    }
}