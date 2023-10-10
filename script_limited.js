class Calculator {
    constructor() {
        this.pre = null;
        this.next = null;
        this.selectedOperator = null;
        this.result = null;
    }

    setOperand(value) {
        if (this.selectedOperator === null) {
            this.pre = parseFloat(value);
        } else if (this.selectedOperator !== null) {
            this.next = parseFloat(value); //! 3回目に入力された数値はここで'B'に割り振られる
        } else if (this.pre !== null && this.result !== null) {
            this.result = this.pre;
        } else {
            this.next = parseFloat(value);
        }
    }

    add() {
        this.result = this.pre + this.next;
        return this.result;
    }

    reset() {
        this.pre = null;
        this.next = null;
        this.selectedOperator = null;
        this.result = null;
    }

    getResult() {
        return this.result;//! 呼び出される回数に注意する
        // "1 + 2 +..."で一回呼び出し
        // 戻り値: 3
        // To 132
    }
}

const buttons = document.querySelectorAll('button');
const result = document.getElementById('result');
const preOperand = document.getElementById('previousOperand');

let currentStage = 'number';
const calculator = new Calculator();
let currentOperator = null;
let currentButton = null;

function logMessages(pre, next, operator, result, currentStage) {
    const forConsole = `\nOperandA: ${pre} \nOperandB: ${next} \ncurrentOperator: ${operator} \nResult: ${result} \ncurrentStage: ${currentStage}`;
    const forDisplay = `<br>OperandA: ${pre} <br>OperandB: ${next} <br>currentOperator: ${operator} <br>Result: ${result} <br>currentStage: ${currentStage}`;

    if (currentButton === '+' || currentButton === '-' || currentButton === '×' || currentButton === '÷') {
        console.log('AnyOperator' + forConsole);
        displayLog('AnyOperator' + forDisplay);
        return;
    } else if (currentButton === '=') {
        console.log('Equal' + forConsole);
        displayLog('Equal' + forDisplay);
        return;
    } else if (currentButton === 'C') {
        console.log('Cleared' + forConsole);
        displayLog('Cleared' + forDisplay);
        return;
    } else if (currentButton === 'CE') {
        console.log('ClearEntries' + forConsole);
        displayLog('ClearEntries' + forDisplay);
    }
}

function displayLog(result) {
    const resultLog = document.querySelector('.result-log');
    const resultPara = document.createElement('p');
    resultPara.classList.add('resultPara');
    resultLog.appendChild(resultPara);
    resultPara.innerHTML = result;
    resultLog.scrollTop = resultLog.scrollHeight;
}

function numberProcess(number) {
    const numberText = number.getAttribute('data-numbers');

    if (result.value === '0' && numberText === '00') {
        result.value = '0';
    } else if (
        (result.value === '0' && numberText !== '00') ||
        (result.value === '0' && numberText !== '0')) {
        if (numberText === '.') {
            result.value = '0.';
        } else {
            result.value = numberText;
        }
    } else if (
        (result.value.indexOf('.') !== -1) &&
        (numberText === '.')
    ) {
        return;
    } else {
        result.value += numberText;
    }
}

function operationProcess(operator) {
    calculator.setOperand(result.value);
    calculator.selectedOperator = currentOperator = operator;
    preOperand.value = calculator.pre;//! 3回目の数値以前の計算結果は表示されない
    result.value = '0';
    currentStage = 'operator';

    // if (calculator.result !== null) {
    //     calculator.pre = calculator.result;
    //     preOperand.value = calculator.pre;
    // }


    // if ((calculator.result === result.value) &&
    //     (calculator.selectedOperator !== null)) { //!
    //     calculator.pre = result.value;
    // } //!

    logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);

}

function clearProcess() {
    calculator.reset();
    result.value = '0';
    preOperand.value = '0';
    currentStage = 'number';

    logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
}

function ceProcess() {
    result.value = '0';
    currentStage = 'number';

    logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
}

function equalProcess() { //! 意図しない連続 "33"
    calculator.setOperand(result.value);
    currentStage = 'result';
    // if (preOperand.value !== null) {
    //     result.value = preOperand.value;
    //     preOperand.value = '0';
    // }

    switch (calculator.selectedOperator) {
        case '+':
            calculator.add();
            result.value = calculator.getResult().toString(); //! "33"になるポイント
            // calculator.selectedOperator = null;
            break;
        default:
        // console.error(`意図しないオペレータ:EqualEvent`);
    }

    logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
}

const clearLog = document.getElementById('clearLog');
clearLog.addEventListener('click', () => {
    const removeParas = document.querySelectorAll('.resultPara');
    removeParas.forEach(para => {
        para.remove();
        console.log('Log Cleared');
    });
});

result.value = '0';
preOperand.value = '0';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerHTML;
        currentButton = buttonText;
        const isNumber = /^[0-9]+$/.test(buttonText);
        const isOperator = buttonText === '+' ||buttonText === '-' ||buttonText === '×' ||buttonText === '÷';

        if (isNumber){
            console.log('数字ボタンが押された');
            numberProcess(button);
        } else if (isOperator){
            console.log('オペレータが押された');
            operationProcess(buttonText);
        } else if (buttonText === '='){
            console.log('\'=\'が押された');
            equalProcess();
        } else if (buttonText === 'C') {
            console.log('\'C\'が押された');
            clearProcess();
        } else if (buttonText === 'CE') {
            console.log('\'CE\'が押された');
            ceProcess();
        }
    })
});

