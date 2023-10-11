class Calculator {
    constructor() {
        this.pre = null;
        this.next = null;
        this.selectedOperator = null;
        this.result = null;
    }

    // setOperand(value) {
    //     if (this.selectedOperator === null) {
    //         this.pre = parseFloat(value);
    //     } else if (this.selectedOperator !== null) {
    //         this.next = parseFloat(value); //! 3回目に入力された数値はここで'B'に割り振られる
    //     } else if (this.pre !== null && this.result !== null) {
    //         this.result = this.pre;
    //     } else {
    //         this.next = parseFloat(value);
    //     }
    // }

    setOperand(value) {
        if (currentStage === 'operandA') {
            this.pre = parseFloat(value);
        } else if (currentStage === 'operandB') {
            this.next = parseFloat(value);
        } else if (currentStage === 'equal') {
            this.pre = this.result;
            preOperand.value = result.value;
        } else if (currentStage === 'operator' || this.next !== null) {
            //処理を実行してOpeAに代入し、入力をthis.nextに代入
            //? 処理を実行させるにはどうすればいい？
            //? 処理した値をOpeAにするには？
            //? -> operatorProcessで計算を実行し結果をthis.resultに入れる
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
const resultLog = document.querySelector('.result-log');
const clearLog = document.getElementById('clearLog');

let currentStage = 'operandA';
// 1.'operandA'
// 2.'operator'
// 3.'operandB'
// 4.'equal'

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

//* operationProcessとequalProcessを統合する
function handleResult(operator) {
    const isOperator = operator === '+' || operator === '-' || operator === '×' || operator === '÷';

    if (isOperator) {
        calculator.setOperand(result.value);//OpeAへ
        calculator.selectedOperator = currentOperator = operator;
        preOperand.value = calculator.pre;
        result.value = '0';

        logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
    } else if (operator === '=') {
        calculator.setOperand(result.value);//OpeBへ
        switch (calculator.selectedOperator) {
            case '+':
                calculator.add();
                result.value = calculator.getResult().toString();
                break;
            default:
        }
        logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
    } else if (currentStage === 'operator' && this.next !== null) {
        // 2回目のオペレータ押下後
        switch (calculator.selectedOperator) {
            case '+':
                calculator.add();
                preOperand.value = calculator.getResult().toString();
                break;
            default:
        }
        logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
    }
}


// function operationProcess(operator) {
//     calculator.setOperand(result.value);
//     calculator.selectedOperator = currentOperator = operator;
//     preOperand.value = calculator.pre;//! 3回目の数値以前の計算結果は表示されない
//     result.value = '0';

//     // 2回目以降のオペレータステージ
//     // if (currentStage === 'operandB')

//     // if (calculator.result !== null) {
//     //     calculator.pre = calculator.result;
//     //     preOperand.value = calculator.pre;
//     // }


//     // if ((calculator.result === result.value) &&
//     //     (calculator.selectedOperator !== null)) { //!
//     //     calculator.pre = result.value;
//     // } //!

//     logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);

// }

// function equalProcess() { //! 意図しない連続 "33"
//     calculator.setOperand(result.value);
//     // if (preOperand.value !== null) {
//     //     result.value = preOperand.value;
//     //     preOperand.value = '0';
//     // }

//     switch (calculator.selectedOperator) {
//         case '+':
//             calculator.add();
//             result.value = calculator.getResult().toString(); //! "33"になるポイント
//             // calculator.selectedOperator = null;
//             break;
//         default:
//         // console.error(`意図しないオペレータ:EqualEvent`);
//     }

//     logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
// }

function clearProcess() {
    calculator.reset();
    result.value = '0';
    preOperand.value = '0';

    logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
}

function ceProcess() {
    result.value = '0';

    logMessages(calculator.pre, calculator.next, calculator.selectedOperator, calculator.result, currentStage);
}

result.value = '0';
preOperand.value = '0';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerHTML;
        currentButton = buttonText;
        const isNumber = /^[0-9]+$/.test(buttonText);
        const isOperator = buttonText === '+' || buttonText === '-' || buttonText === '×' || buttonText === '÷';
        if (isNumber) {
            numberProcess(button);
            if (calculator.pre !== null) { //!
                currentStage = 'operandB';
            } else {
                currentStage = 'operandA';
            }
        } else if (isOperator) {
            // operationProcess(buttonText);
            handleResult(buttonText);
            currentStage = 'operator';
        } else if (buttonText === '=') {
            // equalProcess();
            handleResult(buttonText);
            currentStage = 'equal';
        } else if (buttonText === 'C') {
            clearProcess();
            currentStage = 'operandA';
        } else if (buttonText === 'CE') {
            ceProcess();
            if (calculator.pre !== null) { //!
                currentStage = 'operandB';
            } else {
                currentStage = 'operandA';
            }
        } else if (buttonText === 'CLEAR') {
            const removeParas = document.querySelectorAll('.resultPara');
            removeParas.forEach(para => {
                para.remove();
                console.log('Logs Cleared');
            });
        }
        console.log('currentStage:' + currentStage);
    });
});

