class Calculator {
    constructor() {
        this.pre = null;
        this.next = null;
        this.selectedOperator = null;
        this.result = null;
    }

    // setOperand(value) { //オペランドに代入する
    //     if (this.selectedOperator === null) {
    //         \// 演算子が未選択のとき...
    //         this.pre = parseFloat(value);
    //         \// オペランドAに表示値を代入
    //     } else if (this.selectedOperator !== null) {
    //         \// 演算子が選択済みのとき...
    //         this.next = parseFloat(value);
    //         \// オペランドBに表示値を代入
    //     } else if (this.result !== null) {
    //         this.pre = this.next;
    //         this.next = null;
    //     }
    //     // 1. this.result !== null
    //     // 2. this.selectedOperator !== null
    //     // 3. this.pre = this.next
    //     // 4. this.next = null
    // }
    setOperand(value) {
        if (this.selectedOperator === null) {
            this.pre = parseFloat(value);
        } else if (this.selectedOperator !== null) {
            this.next = parseFloat(value);
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

    subtract() {
        this.result = this.pre - this.next;
        return this.result;
    }

    multiply() {
        this.result = this.pre * this.next;
        return this.result;
    }

    divide() {
        if (this.next === 0) {
            throw new Error("0で除算はできません");
        }
        this.result = this.pre / this.next;
        return this.result;
    }

    percent() {
        if (this.next !== null) {
            this.result = this.next * 0.01;
        } else {
            this.result = this.pre * 0.01;
        }
        return this.result;
        // %を押下後...
        // 即座に結果を表示し...
        // その結果をオペランドとして扱う
    }

    plusOrMinus() {
        if (this.next !== null) {
            this.result = -this.next;
        } else {
            this.result = -this.pre;
        }
        return this.result;
    }

    reset() {
        this.pre = null;
        this.next = null;
        this.selectedOperator = null;
        this.result = null;
    }

    getResult() {
        return this.result;
    }
}

const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button[data-numbers');
const tForms = document.querySelectorAll('button[data-transformation]');
const clear = document.querySelector('button[data-clear]');
const clearEntries = document.querySelector('button[data-clearEntries]');
const operations = document.querySelectorAll('button[data-operation]');
const equal = document.querySelector('button[data-equal]');
const result = document.getElementById('result');
const preOperand = document.getElementById('previousOperand');

// let firstOperand = null;
// let secondOperand = null;
// let transformNumber = null;
let currentOperator = null;
let nextStage = 'number';
const calculator = new Calculator();

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

    // オペランドAが設定されていて、次にオペランドBを設定する段階の場合
    // if (calculator.pre !== null && nextStage === 'operator') {
    //     // オペランドBの表示をリセット
    //     result.value = '';
    //     // オペランドBに数値を設定
    //     calculator.next = numberText;
    //     // オペランドBの設定が完了したので、次のステージへ移行
    //     nextStage = 'number';
    // }

    // 数値の表示を更新
    if (result.value === '0' && numberText === '00') {
        console.error ('\'00\'の表示はできません.他の数字を押してください.');
        return;
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
        (numberText === '.')) {
        return;
    } else {
        result.value += numberText;
    }
}

function transformProcess(transfomer) {
    const tForm = transfomer.innerHTML;
    calculator.setOperand(result.value);
    nextStage = 'operator';
    // (if)0か0以外か
    if (result.value !== '0') {
        switch (tForm) {
            case '%':
                calculator.percent();
                result.value = calculator.getResult().toString();
                break;
            case '±':
                calculator.plusOrMinus();
                result.value = calculator.getResult().toString();
                break;
            default:
                console.error(`意図しないオペレータ:TransformEvent`);
        }
    }

    console.log(`OperandA: ${calculator.pre} \nnextStage: ${nextStage}`);
    displayLog(`OperandA: ${calculator.pre}
        <br>nextStage: ${nextStage}`);
}

function operationProcess(operator) {
    calculator.setOperand(result.value);
    calculator.selectedOperator = currentOperator = operator;
    preOperand.value = calculator.pre;
    result.value = '0';
    nextStage = 'number';

    if (calculator.result !== null) {
        calculator.pre = calculator.result;
        preOperand.value = calculator.pre;
    }

    if ((calculator.result === result.value) &&
        (currentOperator !== null)) { //!
        calculator.pre = result.value;
    } //!

    // console.log(operator);

    //オペランドAはオペレータ押下時まで保持する
    console.log(`OperandA: ${calculator.pre} \ncurrentOperator: ${currentOperator} \nnextStage: ${nextStage}`);
    displayLog(`OperandA: ${calculator.pre}
        <br>currentOperator: ${currentOperator}
        <br>nextStage: ${nextStage}`);
}

function clearProcess() {
    calculator.reset();
    result.value = '0';
    preOperand.value = '0';
    nextStage = 'number';

    console.log(`CLEARED \nOperandA: ${calculator.pre} \nOperandB: ${calculator.next} \ncurrentOperator: ${calculator.selectedOperator} \nResult: ${result.value} \nnextStage: ${nextStage}`);
    displayLog(`CLEARED
        <br>OperandA: ${calculator.pre}
        <br>OperandB: ${calculator.next}
        <br>currentOperator: ${calculator.selectedOperator}
        <br>Result: ${result.value}
        <br>nextStage: ${nextStage}`);
}

function ceProcess() {
    result.value = '0';
    nextStage = 'operator';

    console.log(`CLEARED ENTRIES \nOperandA: ${calculator.pre} \nOperandB: ${calculator.next} \ncurrentOperator: ${calculator.selectedOperator} \nResult: ${result.value} \nnextStage: ${nextStage}`);
    displayLog(`CLEARED ENTRIES
        <br>OperandA: ${calculator.pre}
        <br>OperandB: ${calculator.next}
        <br>currentOperator: ${calculator.selectedOperator}
        <br>Result: ${result.value}
        <br>nextStage: ${nextStage}`);
}

function equalProcess() {
    calculator.setOperand(result.value);
    preOperand.value = '0';
    switch (currentOperator) {
        case '+':
            calculator.add();
            result.value = calculator.getResult().toString();
            break;
        case '-':
            calculator.subtract();
            result.value = calculator.getResult().toString();
            break;
        case '÷':
            calculator.divide();
            result.value = calculator.getResult().toString();
            break;
        case '×':
            calculator.multiply();
            result.value = calculator.getResult().toString();
            break;
        default:
            console.error(`意図しないオペレータ:EqualEvent`);
    }

    console.log(`EQUAL \nOperandA: ${calculator.pre} \nOperandB: ${calculator.next} \ncurrentOperator: ${calculator.selectedOperator} \nResult: ${result.value} \nnextStage: ${nextStage} \nFormula: ${calculator.pre} ${currentOperator} ${calculator.next} = ${result.value}`);

    displayLog(`EQUAL
        <br>OperandA: ${calculator.pre}
        <br>OperandB: ${calculator.next}
        <br>currentOperator: ${calculator.selectedOperator}
        <br>Result: ${result.value}
        <br>nextStage: ${nextStage}
        <br>Formula: ${calculator.pre} ${currentOperator} ${calculator.next} = ${result.value}`);
}

function numberHandler(e) {
    switch (e) {
        case '0':
            if (result.value === '0') {
                return;
            } else {
                result.value += '0';
            } break;
        case '1':
            if (result.value === '0') {
                result.value = '1';
            } else {
                result.value += '1';
            } break;
        case '2':
            if (result.value === '0') {
                result.value = '2';
            } else {
                result.value += '2';
            } break;
        case '3':
            if (result.value === '0') {
                result.value = '3';
            } else {
                result.value += '3';
            } break;
        case '4':
            if (result.value === '0') {
                result.value = '4';
            } else {
                result.value += '4';
            } break;
        case '5':
            if (result.value === '0') {
                result.value = '5';
            } else {
                result.value += '5';
            } break;
        case '6':
            if (result.value === '0') {
                result.value = '6';
            } else {
                result.value += '6';
            } break;
        case '7':
            if (result.value === '0') {
                result.value = '7';
            } else {
                result.value += '7';
            } break;
        case '8':
            if (result.value === '0') {
                result.value = '8';
            } else {
                result.value += '8';
            } break;
        case '9':
            if (result.value === '0') {
                result.value = '9';
            } else {
                result.value += '9';
            } break;
    }
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
numbers.forEach(number => {
    number.addEventListener('click', () => {
        numberProcess(number);
    });
});

tForms.forEach(transfomer => {
    transfomer.addEventListener('click', () => {
        transformProcess(transfomer);
    });
});

operations.forEach(operator => {
    operator.addEventListener('click', () => {
        const operatorText = operator.innerHTML;
        operationProcess(operatorText);
    });
});

clear.addEventListener('click', () => {
    clearProcess();
});

clearEntries.addEventListener('click', () => {
    ceProcess();
});

equal.addEventListener('click', () => {
    equalProcess();
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        numberHandler(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') { //!
        operations.forEach(key => {
            // console.log(key.innerHTML);
            const operatorKey = key.innerHTML;
            switch (operatorKey) {
                case '+':
                    operationProcess('+');
                    break;
                case '-':
                    operationProcess('-');
                    break;
                case '*':
                    operationProcess('*');
                    break;
                case '/':
                    operationProcess('/');
                    break;
            }
        })
    }
});

// function operatorHandler(operator) {
//     // const operatorText = key.innerHTML;
//     // const plus = '<button data-operation="">+</button>';
//     switch (operator) {
//         case '+':
//             operationProcess(plus);
//             break;
//         case '-':
//             operationProcess('-');
//             break;
//         case '*':
//             operationProcess('+');
//             break;
//         case '/':
//             operationProcess('/');
//             break;
//     }
//     // console.log(key);
// }

// operations.forEach(operator => {
//     operator.addEventListener('keydown', (e) => {
//         const key = e.key;
//         switch (key) {
//             case '+':
//                 operationProcess('+');
//                 break;
//         }
//         // console.log(key);
//     });
// });