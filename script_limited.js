class Calculator {
    constructor() {
        this.pre = null;
        this.next = null;
        this.selectedOperator = null;
        this.result = null;
        this.timesOfOperator = 0;

        this.currentOperator = null;
        this.currentButton = null;
        this.currentStage = 'operandA';
        // 1.'operandA'
        // 2.'operator'
        // 3.'operandB'
        // 4.'equal'
    }

    // setOperand(value) {
    //     if (currentStage === 'operandA') {
    //         this.pre = parseFloat(value);
    //     } else if (currentStage === 'operandB') {
    //         this.next = parseFloat(value);
    //     } else if (currentStage === 'equal') {
    //         this.pre = this.result;
    //         preOperand.value = result.value;
    //     }
    // }

    add() {
        this.result = this.pre + this.next;
        return this.result;
    }

    reset() {
        this.pre = null;
        this.next = null;
        this.selectedOperator = null;
        this.result = null;
        this.timesOfOperator = 0;
        this.currentOperator = null;
        this.currentButton = null;
    }

    getResult() {
        return this.result;
    }
}

const buttons = document.querySelectorAll('button');
const result = document.getElementById('result');
const preOperand = document.getElementById('previousOperand');
const resultLog = document.querySelector('.result-log');
const clearLog = document.getElementById('clearLog');
const calculator = new Calculator();

result.value = '0';
preOperand.value = '0';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttonProcess(button);
    });
});

function logMessages() {
    const pre = calculator.pre;
    const next = calculator.next;
    const operator = calculator.selectedOperator;
    const result = calculator.result;
    // const stage = calculator.currentStage;

    const forConsole = `\nOperandA: ${pre} \ncurrentOperator: ${operator} \nOperandB: ${next}  \nResult: ${result}`;
    const forDisplay = `<br>OperandA: ${pre} <br>currentOperator: ${operator} <br>OperandB: ${next}  <br>Result: ${result}`;
    const operators = ['+', '-', '×', '÷'];
    const isOperator = operators.includes(operator);

    if (isOperator) {
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

function setOperand(value) {
    if (calculator.currentStage === 'operandA') {
        calculator.pre = parseFloat(value);
    } else if (calculator.currentStage === 'operandB') {
        calculator.next = parseFloat(value);
    } else if (calculator.currentStage === 'equal') {
        calculator.pre = calculator.result;
        preOperand.value = result.value;
    }
}

function handleResult(operator) {
    const operators = ['+', '-', '×', '÷'];
    const isOperator = operators.includes(operator);

    if (isOperator && calculator.timesOfOperator >= 2) {
        switch (calculator.selectedOperator) {
            case '+':
                setOperand(result.value);
                calculator.add();
                preOperand.value = calculator.getResult().toString();
                calculator.pre = calculator.result;
                // calculator.next = null;
                result.value = '0';
                console.log(`// 2回目のオペレータ押下後`);
                break;
            default:
        }

        logMessages();
    } else if (isOperator) {
        setOperand(result.value);//OpeAへ
        calculator.selectedOperator = calculator.currentOperator = operator;
        preOperand.value = calculator.pre;
        result.value = '0';

        logMessages();
    } else if (operator === '=') {
        setOperand(result.value);//OpeBへ
        switch (calculator.selectedOperator) {
            case '+':
                calculator.add();
                result.value = calculator.getResult().toString();
                preOperand.value = '0';
                break;
            default:
        }

        logMessages();
    }
}

function clearProcess() {
    calculator.reset();
    result.value = '0';
    preOperand.value = '0';

    logMessages();
}

function ceProcess() {
    result.value = '0';

    logMessages();
}

function buttonProcess(button) {
    const buttonText = button.innerHTML;
    currentButton = buttonText;
    const isNumber = /^[0-9]+$/.test(buttonText);
    const operators = ['+', '-', '×', '÷'];
    const isOperator = operators.includes(buttonText);
    if (isNumber) {
        numberProcess(button);
        if (calculator.pre !== null) { //!
            calculator.currentStage = 'operandB';
        } else {
            calculator.currentStage = 'operandA';
        }
    } else if (isOperator) {
        handleResult(buttonText);
        calculator.currentStage = 'operator';
        calculator.timesOfOperator++;
    } else if (buttonText === '=') {
        handleResult(buttonText);
        calculator.currentStage = 'equal';
    } else if (buttonText === 'C') {
        clearProcess();
        calculator.currentStage = 'operandA';
    } else if (buttonText === 'CE') {
        ceProcess();
    } else if (buttonText === 'CLEAR') {
        const removeParas = document.querySelectorAll('.resultPara');
        removeParas.forEach(para => {
            para.remove();
            console.log('Logs Cleared');
        });
    }
    console.log('currentStage:' + calculator.currentStage);
    console.log(`Times of Operator: ${calculator.timesOfOperator}`);
}

