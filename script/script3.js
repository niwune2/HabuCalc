class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        this.clearEntries();
    }

    clearEntries() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.result = '';
        this.operator = null;
    }

    clear() {
        this.currentOperand = '';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
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

    addition(previous, current){
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
            throw new Error("0で除算はできません");
        }

        return previous / current;
    }

    percent(previous, current) { //TODO 要検証
        if (current !== null) {
            return current = current * 0.01;
        } else {
            return previous = previous * 0.01;
        }
    }

    plusMinus(previous, current) { //TODO 要検証
        if (current !== null) {
            return current = -current;
        } else {
            return previous = -previous;
        }
    }
}

const previousOperandTextElement = document.getElementById('previousOperand');
const currentOperandTextElement = document.getElementById('currentOperand');
const buttons = document.querySelectorAll('button');
const resultLog = document.querySelector('.result-log');
const clearLog = document.getElementById('clearLog');
const calculator =
    new Calculator(previousOperandTextElement, currentOperandTextElement);

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        buttonProcess(button);
        logMessages(button);
    });
});

function buttonProcess(button) { //TODO ボタンの種類を追加する
    const buttonText = button.innerText;
    const isNumber = /^[0-9]+$/.test(buttonText);
    const operators = ['+', '-', '×', '÷'];
    const isOperator = operators.includes(buttonText);

    if (isNumber) {
        calculator.appendNumber(buttonText);
        calculator.updateDisplay();
    } else if (isOperator) {
        calculator.chooseOperation(buttonText);
        calculator.updateDisplay();
    } else if (buttonText === '=') {
        calculator.compute();
        calculator.updateDisplay();
    } else if (buttonText === 'C') {
        calculator.clear();
        calculator.updateDisplay();
    } else if (buttonText === 'CE') {
        calculator.clearEntries();
        calculator.updateDisplay();
    } else if (buttonText === 'CLEAR') {
        const removeParas = document.querySelectorAll('.resultPara');
        removeParas.forEach(para => {
            para.remove();
            console.log('Logs Cleared');
        });
    }
}

function logMessages(button) {
    const buttonText = button.innerText;
    const pre = calculator.previousOperand;
    const cur = calculator.currentOperand;
    const operator = calculator.operator;
    const result = calculator.result;

    const forConsole = `\nOperandA: ${pre} \ncurrentOperator: ${operator} \nOperandB: ${cur}  \nResult: ${result}`;
    const forDisplay = `<br>OperandA: ${pre} <br>currentOperator: ${operator} <br>OperandB: ${cur}  <br>Result: ${result}`;
    const operators = ['+', '-', '×', '÷'];
    const isOperator = operators.includes(operator);

    if (isOperator) {
        console.log('AnyOperator' + forConsole);
        displayLog('AnyOperator' + forDisplay);
        return;
    } else if (buttonText === '=') {
        console.log('Equal' + forConsole);
        displayLog('Equal' + forDisplay);
        return;
    } else if (buttonText === 'C') {
        console.log('Cleared' + forConsole);
        displayLog('Cleared' + forDisplay);
        return;
    } else if (buttonText === 'CE') {
        console.log('ClearEntries' + forConsole);
        displayLog('ClearEntries' + forDisplay);
    }
}

function displayLog(result) {
    const resultPara = document.createElement('p');
    resultPara.classList.add('resultPara');
    resultLog.appendChild(resultPara);
    resultPara.innerHTML = result;
    resultLog.scrollTop = resultLog.scrollHeight;
}