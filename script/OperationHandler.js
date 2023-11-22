export default class OperationHandler {
    constructor(currentOperand, operator) {
        this.currentOperand = currentOperand;
        this.operator = operator;
    }

    chooseOperation(operator) {
        if (this.currentOperand === '') {
            return;
        }

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) {
            return;
        }

        switch (this.operator) {
            case '+':
                this.result = this.addition(previous, current);
                break;
            case '-':
                this.result = this.subtract(previous, current);
                break;
            case '×':
                this.result = this.multiply(previous, current);
                break;
            case '÷':
                this.result = this.divide(previous, current);
                break;
            default:
                return;
        }

        this.currentOperand = this.result; // 連続計算
        this.operator = null;
        this.previousOperand = '';
    }
}