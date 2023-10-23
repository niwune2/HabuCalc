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
        this.currentOperand = this.currentOperand.toString() + number.toString(); //OK
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
        // let computation = null;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) {
            return;
        }

        switch (this.operator) {
            case '+':
                //TODO `add()`に渡したい
                this.result = previous + current;
                break;
            default:
                return;
        }

        // this.currentOperand = computation;//!連続計算
        this.currentOperand = this.result;
        this.operator = null;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;//整数桁表示用

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay =
                integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }); //OK
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.value = this.getDisplayNumber(this.currentOperand);

        if (this.operator != null) {
            this.previousOperandTextElement.value =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.previousOperandTextElement.value = '';
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

function buttonProcess(button) {
    // console.log(`Button Clicked: ${button.innerText}`);
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