export default class OperationHandler {
    constructor(operator) {
        this.operator = operator;
        this.result = '';
    }
    //* `previousOperand`と`currentOperand`はどこかに一元管理する必要があるかもしれない

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
                this.result = mathOperation.addition(previous, current);
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

import MathOperation from "./MathOperation.js";
import UIHandler from "./UIHandler.js";

const mathOperation = new MathOperation();
const uiHandler = new UIHandler();

//* モジュール化して値を呼び出すテスト - 成功
const currentValue = uiHandler.setCurrentOperand('OperationHandler.jsから\nUIHandler.jsのsetCurrentOperand()へ送る');