export default class UIHandler {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        //* 必要なプロパティはここに集約する
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.currentOperand = '';
        this.previousOperand = '';
        this.result = '';
        this.operator = '';
    }

    setCurrentOperand(value){
        this.currentOperand = value;
        console.log(`UIHandlerに送られたメッセージ: \n${value}`);
    }

    updateDisplay() {
        // メインディスプレイ用の数字を表示するためのif
        this.currentOperandTextElement.value =
            this.getDisplayNumber(this.currentOperand);

        if (this.operator != null) { //サブディスプレイ用の数字を表示するためのif
            this.previousOperandTextElement.value =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.previousOperandTextElement.value = '';
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;//整数桁表示用

        if (Number.isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay =
                integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }

    clearEntries() {
        this.currentOperand = '';
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.result = '';
        this.operator = null;
    }
}