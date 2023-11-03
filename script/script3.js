class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        this.clearEntries();
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

    updateDisplay() {
        this.currentOperandTextElement.value = this.getDisplayNumber(this.currentOperand);

        if (this.operator != null) {
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

        if (isNaN(integerDigits)) {
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
            case '*':
            case '×':
                this.result = this.multiply(previous, current);
                break;
            case '/':
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
            throw new Error("0で除算はできません");
        }

        return previous / current;
    }

    transform(symbol) {
        if (this.currentOperand === '') {
            return;
        }

        switch (symbol) {
            case '%':
                this.currentOperand = this.percent(parseFloat(this.currentOperand));
                break;
            case 'o':
            case '±':
                this.currentOperand = this.plusOrMinus(parseFloat(this.currentOperand));
                break;
            default:
                return;
        }
    }

    percent(current) {
        return 0.01 * current;
    }

    plusOrMinus(current) {
        return -1 * current;
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
        // console.log(button.innerText);
    });
});

const operators = ['+', '-', '×', '*', '/', '÷'];
const symbols = [
    '±', 'o', '%',
    'mc', 'm+', 'm-', 'mr',
    '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x',
    '1/x', '2√x', '3√x', 'y√x', 'ln', 'log10',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand'
];

function buttonProcess(button) { //TODO ボタンの種類を追加する
    const buttonText = button.innerText;
    const isNumber = /^[0-9]+$/.test(buttonText);
    const isOperator = operators.includes(buttonText);
    const isSymbol = symbols.includes(buttonText);

    if (isNumber || buttonText === '.') {
        calculator.appendNumber(buttonText);
        calculator.updateDisplay();
    } else if (isOperator) {
        calculator.chooseOperation(buttonText);
        calculator.updateDisplay();
    } else if (isSymbol) {
        calculator.transform(buttonText);
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

document.addEventListener('keydown', (e) => {
    const key = e.key;
    const isNumber = /^[0-9]+$/.test(key);
    // const operators = ['+', '-', '*', '/'];
    const isOperator = operators.includes(key);
    // const symbols = ['o', '%']; // 'o'='±'
    const isSymbol = symbols.includes(key);

    if (isNumber || key === '.') {
        calculator.appendNumber(key);
        calculator.updateDisplay();
        logMessages(key);
    } else if (isOperator) {
        calculator.chooseOperation(key);
        calculator.updateDisplay();
        logMessages(key);
    } else if (key === '=') {
        calculator.compute();
        calculator.updateDisplay();
        logMessages(key);
    } else if (isSymbol) {
        calculator.transform(key);
        calculator.updateDisplay();
        logMessages(key);
    } else if (key === 'c') {
        calculator.clear();
        calculator.updateDisplay();
        logMessages(key);
    } else if (key === 'a') {
        calculator.clearEntries();
        calculator.updateDisplay();
        logMessages(key);
    }
});

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