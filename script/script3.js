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
                this.currentOperand = this.percent();
                break;
            case 'o':
            case '±':
                this.currentOperand = this.plusOrMinus();
                break;
            case 'x^2':
                this.currentOperand = this.exponentiation(2);
                break;
            case 'x^3':
                this.currentOperand = this.exponentiation(3);
                break;
            case 'x^y': //!
                // this.currentOperand = this.exponentiation();
                // 第三の数値の入力を受け付ける機能が必要
                break;
            case '10^x':
                this.currentOperand = this.powerOf10();
                break;
            case 'e^x':
                this.currentOperand = this.napier();
                break;
            case 'x!':
                this.currentOperand = this.factorial();
                break;
            default:
                throw new Error('Symbolが定義されていません');
        }
    }

    percent() {
        return 0.01 * parseFloat(this.currentOperand);
    }

    plusOrMinus() {
        return -1 * parseFloat(this.currentOperand);
    }

    exponentiation(exponent) {
        return Math.pow(parseFloat(this.currentOperand), exponent);
    }

    powerOf10() {
        return Math.pow(10, parseFloat(this.currentOperand));
    }

    napier() {
        return Math.E * parseFloat(this.currentOperand);
    }

    factorial() {
        if (this.currentOperand === 0 || this.currentOperand === 1) {
            return 1;
        } else {
            let result = 1;
            for (let i = 2; i <= this.currentOperand; i++) {
                result *= i;
            }
            return result;
        }
    }
}

const previousOperandTextElement = document.getElementById('previousOperand');
const currentOperandTextElement = document.getElementById('currentOperand');
const inputFieldTextElement = document.getElementById('inputField');
const buttons = document.querySelectorAll('button');
const resultLog = document.querySelector('.result-log');
const clearLog = document.getElementById('clearLog');
const calculator =
    new Calculator(previousOperandTextElement, currentOperandTextElement);

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        buttonProcess(button);
        logMessages(button);
        console.log(button.innerText);
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

/**---------------button--------------- */
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
/**--------------------------------- */

/**---------------key--------------- */
document.addEventListener('keydown', (e) => {
    const key = e.key;
    const isNumber = /^[0-9]+$/.test(key);
    const isOperator = operators.includes(key);
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
/**----------------------------------- */

/**-------- log ---------- */
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
/**----------------------- */

/**-----Word to Number----- */
const wordToNumber = {
    "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18, "nineteen": 19, "twenty": 20, "twenty-one": 21, "twenty-two": 22, "twenty-three": 23, "twenty-four": 24, "twenty-five": 25, "twenty-six": 26, "twenty-seven": 27, "twenty-eight": 28, "twenty-nine": 29, "thirty": 30, "thirty-one": 31, "thirty-two": 32, "thirty-three": 33, "thirty-four": 34, "thirty-five": 35, "thirty-six": 36, "thirty-seven": 37, "thirty-eight": 38, "thirty-nine": 39, "forty": 40, "forty-one": 41, "forty-two": 42, "forty-three": 43, "forty-four": 44, "forty-five": 45, "forty-six": 46, "forty-seven": 47, "forty-eight": 48, "forty-nine": 49, "fifty": 50, "fifty-one": 51, "fifty-two": 52, "fifty-three": 53, "fifty-four": 54, "fifty-five": 55, "fifty-six": 56, "fifty-seven": 57, "fifty-eight": 58, "fifty-nine": 59, "sixty": 60, "sixty-one": 61, "sixty-two": 62, "sixty-three": 63, "sixty-four": 64, "sixty-five": 65, "sixty-six": 66, "sixty-seven": 67, "sixty-eight": 68, "sixty-nine": 69, "seventy": 70, "seventy-one": 71, "seventy-two": 72, "seventy-three": 73, "seventy-four": 74, "seventy-five": 75, "seventy-six": 76, "seventy-seven": 77, "seventy-eight": 78, "seventy-nine": 79, "eighty": 80, "eighty-one": 81, "eighty-two": 82, "eighty-three": 83, "eighty-four": 84, "eighty-five": 85, "eighty-six": 86, "eighty-seven": 87, "eighty-eight": 88, "eighty-nine": 89, "ninety": 90, "ninety-one": 91, "ninety-two": 92, "ninety-three": 93, "ninety-four": 94, "ninety-five": 95, "ninety-six": 96, "ninety-seven": 97, "ninety-eight": 98, "ninety-nine": 99
};

const wordToOperator = {
    "plus": '+', "minus": '-', "times": '*', "divided by": '/'
};

const wordToSymbols = {
    "percent": '%', "plus or minus": '±'
};


// inputFieldに入力された単語を数値に変換するコード
//// 'Enter'を押して変換する
//// '25'のような2桁数字は'twenty-five'と入力させる
//// 対応は2桁まで
// 提案機能は後回し
//// 初期の表示は薄地で”Enter numbers with words"と表示させる
//// あるいは入力例を表示させる
//// 20以上の二桁に対応するため、オブジェクトを2つに分ける？

function convertWordToNumber(word) {
    if (word in wordToNumber) {
        return wordToNumber[word];
    } else {
        return null; // 対応する数値が見つからない場合の処理
    }
}

function convertWordToOperator(word) {
    if (word in wordToOperator) {
        return wordToOperator[word];
    } else {
        return null;
    }
}

function convertWordToSymbols(word) {
    if (word in wordToSymbols) {
        return wordToSymbols[word];
    } else {
        return null;
    }
}

inputFieldTextElement.addEventListener('blur', () => {
    const array = Object.keys(wordToNumber);
    const randomKey = array[Math.floor(Math.random() * array.length)];
    inputFieldTextElement.style.color = 'rgba(0,0,0,0.3)';
    inputFieldTextElement.value = `Enter a number like: ${randomKey}`;
})

inputFieldTextElement.addEventListener('focus', () => {
    inputFieldTextElement.style.color = 'rgba(0,0,0)';
    inputFieldTextElement.value = '';
})

inputFieldTextElement.addEventListener('input', () => {
    document.addEventListener('keydown', (e) => {
        const userInput = inputFieldTextElement.value.trim().toLowerCase();
        const numericValue = convertWordToNumber(userInput);
        //! オペレータとシンボルに対応させる
        // 1. `inputFieldTextElement.value`が
        // `number`のとき -> `convertWordToNumber(userInput)`
        // `operator`のとき -> `convertWordToOperator(userInput)`
        // `symbols`のとき -> `convertWordToSymbols(userInput)`
        // 2. `switch`内
        // 条件文: `userInput`が
        // `number`のとき -> `calculator.appendNumber(numericValue)`
        // `operator`のとき -> `calculator.chooseOperation(operatorValue)`
        // `symbols`のとき -> `calculator.transform(symbolValue)`

        const key = e.key;
        switch (key) {
            case 'Enter':
                if (numericValue !== null) {
                    calculator.appendNumber(numericValue);
                    calculator.updateDisplay();
                    console.log(`the numeric value is: ${numericValue}`);
                    displayLog(numericValue);
                    inputFieldTextElement.value = '';
                }
                break;
            default: return;
        }
    });
});


// inputFieldTextElement.addEventListener('input', () => {
//     const userInput = inputFieldTextElement.value.trim().toLowerCase();
//     if (userInput.length === 1) {
//         const suggestion = suggestWord(userInput);
//         inputFieldTextElement.value = suggestion;
//     } else {
//         inputFieldTextElement.value = '';
//     }
// });

// inputFieldTextElement.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//         const userInput = inputFieldTextElement.value.trim().toLowerCase();
//         const suggestion = suggestWord(userInput);
//         if (suggestion) {
//             inputFieldTextElement.value = suggestion;
//             inputFieldTextElement.value = '';
//         }
//     }
// });

// function suggestWord(userInput) {
//     for (const word in wordToNumber) {
//         if (word.startsWith(userInput)) {
//             return word;
//         }
//     }
//     return null;
// }
