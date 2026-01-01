// 条件文を減らせ
// `setOperand`と`handleResult`を統合する
// 関数毎に分けるのは後

class Calculator {
    constructor(preOperand, curOperand) {
        this.preOperand = preOperand;
        this.curOperand = curOperand;
        this.result = null;
        this.operator = null;
    }

    appendNumber(number) {
        //数字の追加
        //イベントリスナーから送られた数字を処理する
        //`preOperand`へ代入する
        //小数点の文字列を扱う
        if (number === '.' && this.curOperand.includes('.')) {
            return;
        }

        this.curOperand = this.curOperand.toString() + number.toString();
    }

    getDisplayNumber(number) {
        //数文字列を表示可能な形式に処理する
        //一度数値に直す
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay = null;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        //数字の表示を制御する
        this.curOperand.innerText = this.getDisplayNumber(this.curOperand);

        if (this.operator != null) {
            this.preOperand.innerText = `${this.getDisplayNumber(this.preOperand)} ${this.operator}`;
        } else {
            this.preOperand.innerText = '';
        }
    }

    chooseOperation(operator) {
        if (this.curOperand === '') {
            return;
        }

        if (this.preOperand !== '') {
            this.compute();
        }

        this.operator = operator;
        this.preOperand = this.curOperand;
        this.curOperand = '';
    }

    compute(){
        let computation = null;
        const previous = parseFloat(this.preOperand);
        const current = parseFloat(this.curOperand);

        if (isNaN(previous) || isNaN(current)){
            return;
        }

        switch(this.operator) {
            case '+':
                computation = add();
                break;
        }
        this.curOperand = computation;
        this.operator = null;
        this.preOperand = '';
        logMessages();
    }

    //以下、各オペレータに応じた計算のためのメソッド

    clearProcess() {
        calculator.reset();
        curOperand.value = '0';
        preOperand.value = '0';
        logMessages();
    }

    ceProcess() {
        curOperand.value = '0';
        logMessages();
    }

    add() {
        this.result = this.pre + this.cur;
        return this.result;
    }

    reset() {
        this.pre = null;
        this.cur = null;
        this.operator = null;
        this.result = null;
    }
}

const buttons = document.querySelectorAll('button');
const curOperand = document.getElementById('currentOperand');
const preOperand = document.getElementById('previousOperand');
const resultLog = document.querySelector('.result-log');
const clearLog = document.getElementById('clearLog');
const calculator = new Calculator(preOperand, curOperand);

curOperand.value = '0';
preOperand.value = '0';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttonProcess(button);
    });
});

function buttonProcess(button) {
    const buttonText = button.innerText;
    currentButton = buttonText;
    const isNumber = /^[0-9]+$/.test(buttonText);
    const operators = ['+', '-', '×', '÷'];
    const isOperator = operators.includes(buttonText);
    if (isNumber) {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        // numberProcess(button);
    } else if (isOperator) {
        calculator.chooseOperation(buttonText);
        // handleResult(buttonText);

    } else if (buttonText === '=') {
        // handleResult(buttonText);
    } else if (buttonText === 'C') {
        calculator.clearProcess();
    } else if (buttonText === 'CE') {
        calculator.ceProcess();
    } else if (buttonText === 'CLEAR') {
        const removeParas = document.querySelectorAll('.resultPara');
        removeParas.forEach(para => {
            para.remove();
            console.log('Logs Cleared');
        });
    }
}

function logMessages() {
    const pre = calculator.pre;
    const cur = calculator.cur;
    const operator = calculator.operator;
    const result = calculator.result;
    // const stage = calculator.currentStage;

    const forConsole = `\nOperandA: ${pre} \ncurrentOperator: ${operator} \nOperandB: ${cur}  \nResult: ${result}`;
    const forDisplay = `<br>OperandA: ${pre} <br>currentOperator: ${operator} <br>OperandB: ${cur}  <br>Result: ${result}`;
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

// function numberProcess(number) {
//     const numberText = number.getAttribute('data-numbers');

//     if (curOperand.value === '0' && numberText === '00') {
//         curOperand.value = '0';
//     } else if (
//         (curOperand.value === '0' && numberText !== '00') ||
//         (curOperand.value === '0' && numberText !== '0')) {
//         if (numberText === '.') {
//             curOperand.value = '0.';
//         } else {
//             curOperand.value = numberText;
//         }
//     } else if (
//         (curOperand.value.indexOf('.') !== -1) &&
//         (numberText === '.')
//     ) {
//         return;
//     } else {
//         curOperand.value += numberText;
//     }
// }

/*
条件文に必要な要件
1. 数値ではない
2. どこに数値が入っているか
3. preに値が入っていてcurにも値が入っているとき
    1. イコールを押したらpreとcurで計算する
    2. オペレータを押したら
        1. preとcurで計算して
        2. 結果を表示して
        3. 結果をpreに代入して

結果を出すところまでは
イコールもオペレータも同じ機能であるため
そこまでは共通のコードで動かす

一連の条件文で
*/



// function setOperand(value) {
//     if (calculator.currentStage === 'operandA') {
//         calculator.pre = parseFloat(value);
//     } else if (calculator.currentStage === 'operandB') {
//         calculator.cur = parseFloat(value);
//     } else if (calculator.currentStage === 'equal') {
//         calculator.pre = calculator.result;
//         preOperand.value = curOperand.value;
//     }
// }

// function handleResult(operator) {
//     const operators = ['+', '-', '×', '÷'];
//     const isOperator = operators.includes(operator);

//     if (isOperator) {
//         switch (calculator.operator) {
//             case '+':
//                 setOperand(curOperand.value);
//                 calculator.add();
//                 preOperand.value = calculator.getResult().toString();
//                 calculator.pre = calculator.result;
//                 // calculator.cur = null;
//                 curOperand.value = '0';
//                 console.log(`// 2回目のオペレータ押下後`);
//                 break;
//             default:
//         }

//         logMessages();
//     } else if (isOperator) {
//         setOperand(curOperand.value);//OpeAへ
//         calculator.operator = calculator.currentOperator = operator;
//         preOperand.value = calculator.pre;
//         curOperand.value = '0';

//         logMessages();
//     } else if (operator === '=') {
//         setOperand(curOperand.value);//OpeBへ
//         switch (calculator.operator) {
//             case '+':
//                 calculator.add();
//                 curOperand.value = calculator.getResult().toString();
//                 preOperand.value = '0';
//                 break;
//             default:
//         }

//         logMessages();
//     }
// }



