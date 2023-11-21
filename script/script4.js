class UIHandler {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.currentOperand = ''; //
        this.previousOperand = '';
        this.result = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.value =
            this.getDisplayNumber(this.currentOperand);

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

class OperationHandler {
    constructor(currentOperand, operator) {
        this.currentOperand = currentOperand;
        this.operator = operator;
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
}

class SymbolHandler {
    constructor (symbol) {
        this.symbol = symbol;
    }

    transform(symbol) {
        if (this.currentOperand === '') {
            return;
        }

        switch (symbol) {
            case '%':
                console.log('symbol: %');
                this.currentOperand = mathOperation.percent;
                break;
            case '±':
                this.currentOperand = mathOperation.plusOrMinus;
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
            case 'e':
                this.currentOperand = this.napier();
                break;
            case 'e^x':
                this.currentOperand = this.napierExp();
                break;
            case 'x!':
                this.currentOperand = this.factorial();
                break;
            case '1/x':
                this.currentOperand = this.reciprocal();
                break;
            case '2√x':
                this.currentOperand = this.squareRoot();
                break;
            case '3√x':
                this.currentOperand = this.cubedRoot();
                break;
            case 'y√x': //!
                this.currentOperand = this.root();
            case 'ln':
                this.currentOperand = this.log();
                break;
            case 'log10':
                this.currentOperand = this.log10();
                break;
            case 'logy': //!
                this.currentOperand = this.log();
                break;
            case 'log2':
                this.currentOperand = this.log();
                break;
            case 'sin(Rad)':
                this.currentOperand = this.sin('radian');
                break;
            case 'sin(Deg)':
                this.currentOperand = this.sin('degree');
                break;
            case 'sin-1':
                this.currentOperand = this.sin('arc');
                break;
            case 'sinh':
                this.currentOperand = this.sin('sinh');
                break;
            case 'sinh-1':
                this.currentOperand = this.sin('sinhArc');
                break;
            case 'cos(Rad)':
                this.currentOperand = this.cos('radian');
                break;
            case 'cos(Deg)':
                this.currentOperand = this.cos('degree');
                break;
            case 'cos-1':
                this.currentOperand = this.cos('arc');
                break;
            case 'cosh':
                this.currentOperand = this.cos('cosh');
                break;
            case 'cosh-1':
                this.currentOperand = this.cos('coshArc');
                break;
            case 'tan(Rad)':
                this.currentOperand = this.tan('radian');
                break;
            case 'tan(Deg)':
                this.currentOperand = this.tan('degree');
                break;
            case 'tan-1':
                this.currentOperand = this.tan('arc');
                break;
            case 'tanh':
                this.currentOperand = this.tan('tanh');
                break;
            case 'tanh-1':
                this.currentOperand = this.tanh('tanhArc');
                break;
            case 'π':
                this.currentOperand = this.pi();
                break;
            case 'Rand':
                this.currentOperand = this.rand();
                break;
            case 'EE':
                this.currentOperand = this.enterExponent();
                break;
            default:
                errorMessages('symbol');
                throw new Error('Symbolが定義されていません');
        }
    }

}

class MathOperation { // コンストラクタを設定し直す
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
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
            errorMessages('divideByZero');
            throw new Error("0で除算はできません");
        }

        return previous / current;
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

    squareRoot() {
        return Math.sqrt(parseFloat(this.currentOperand));
    }

    cubedRoot() {
        return Math.cbrt(parseFloat(this.currentOperand));
    }

    napier() {
        return Math.E * parseFloat(this.currentOperand);
    }

    napierExp() {
        return Math.exp(parseFloat(this.currentOperand));
    }

    reciprocal() {
        return 1 / parseFloat(this.currentOperand);
    }
}

class MathFunction {
    constructor(previous, current, option) {
        this.previous = previous;
        this.current = current;
        this.option = option;
    }

    factorial() {
        const input = parseFloat(this.currentOperand);

        if (Number.isNaN(input)) {
            displayError('input');
            throw new Error('エラー: 無効な入力です');
        }

        if (input < 0 || !Number.isInteger(input)) {
            displayError('nonNegativeInteger');
            throw new Error('エラー： 入力は非負整数でなければなりません。')
        }

        if (input === 0 || input === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= this.currentOperand; i++) {
            result *= i;
        }
        return result;
    }

    rand() {
        return Math.random();
    }

    pi() {
        return Math.PI * parseFloat(this.currentOperand);
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    log() {
        return Math.log(parseFloat(this.currentOperand));
    }

    log10() {
        return Math.log10(parseFloat(this.currentOperand));
    }

    enterExponent() {
        return parseFloat(this.currentOperand).toExponential();
    }

    sin(mode) {
        if (Number.isNaN(this.currentOperand)) {
            displayError('input');
            throw new Error('エラー: 無効な入力です');
        }

        let result;
        switch (mode) {
            case 'degree':
                if (this.currentOperand < -90 || this.currentOperand > 90) {
                    displayError('cosDeg');
                    throw new Error('エラー: 入力は -90 から 90 の範囲である必要があります');
                }
                result = Math.sin(this.degreesToRadians(parseFloat(this.currentOperand)));
                break;
            case 'radian':
                if (this.currentOperand < -Math.PI / 2 || this.currentOperand > Math.PI / 2) {
                    displayError('sinRad');
                    throw new Error('エラー: 入力は -π/2 から π/2 の範囲である必要があります');
                }
                result = Math.sin(parseFloat(this.currentOperand));
                break;
            case 'arc':
                if (this.currentOperand < -1 || this.currentOperand > 1) {
                    displayError('sinArc');
                    throw new Error('エラー: 入力は -1 から 1 の範囲である必要があります');
                }
                result = Math.asin(parseFloat(this.currentOperand));
                break;
            case 'sinh':
                result = Math.sinh(parseFloat(this.currentOperand));
                break;
            case 'sinhArc':
                if (this.currentOperand < 1) {
                    displayError('sinhArc');
                    throw new Error('エラー: 入力は 1 以上である必要があります');
                }
                result = Math.asinh(parseFloat(this.currentOperand));
                break;
            default:
                displayError('notSupportMode');
                throw new Error('エラー: サポートされていないモードです。');
        }

        return result;
    }

    cos(mode) {
        if (Number.isNaN(this.currentOperand)) {
            displayError('input');
            throw new Error('エラー: 無効な入力です');
        }

        let result;
        switch (mode) {
            case 'degree':
                if (this.currentOperand < -90 || this.currentOperand > 90) {
                    displayError('cosDeg');
                    throw new Error('エラー: 入力は -90 から 90 の範囲である必要があります');
                }
                result = Math.cos(this.degreesToRadians(parseFloat(this.currentOperand)));
                break;
            case 'radian':
                if (this.currentOperand < -Math.PI / 2 || this.currentOperand > Math.PI / 2) {
                    displayError('cosRad');
                    throw new Error('エラー: 入力は -π/2 から π/2 の範囲である必要があります');
                }
                result = Math.cos(parseFloat(this.currentOperand));
                break;
            case 'arc':
                if (this.currentOperand < -1 || this.currentOperand > 1) {
                    displayError('cosArc');
                    throw new Error('エラー: 入力は -1 から 1 の範囲である必要があります');
                }
                result = Math.asin(parseFloat(this.currentOperand));
                break;
            case 'cosh':
                result = Math.cosh(parseFloat(this.currentOperand));
                break;
            case 'coshArc':
                if (this.currentOperand < 1) {
                    displayError('coshArc');
                    throw new Error('エラー: 入力は 1 以上である必要があります');
                }
                result = Math.acosh(parseFloat(this.currentOperand));
                break;
            default:
                displayError('notSupportMode');
                throw new Error('エラー: サポートされていないモードです');
        }

        return result;
    }

    tan(mode) {
        if (Number.isNaN(this.currentOperand)) {
            displayError('input');
            throw new Error('エラー: 無効な入力です');
        }

        let result;
        switch (mode) {
            case 'degree':
                if (this.currentOperand % -90 === 45 || this.currentOperand % 90 === -45) {
                    displayError('tanDeg');
                    throw new Error('エラー: 入力は 90 の倍数の範囲でなければなりません');
                }
                result = Math.tan(this.degreesToRadians(parseFloat(this.currentOperand)));
                break;
            case 'radian':
                if (Math.abs(this.currentOperand) % (Math.PI / 2) === Math.PI / 4) {
                    displayError('tanRad');
                    throw new Error('エラー: 入力は π/2 の倍数でなければなりません');
                }
                result = Math.tan(parseFloat(this.currentOperand));
                break;
            case 'arc':
                if (this.currentOperand < -1 || this.currentOperand > 1) {
                    displayError('tanArc');
                    throw new Error('エラー: 入力は -1 から 1 の範囲である必要があります');
                }
                result = Math.atan(parseFloat(this.currentOperand));
                break;
            case 'tanh':
                result = Math.tanh(parseFloat(this.currentOperand));
                break;
            case 'tanhArc':
                if (this.currentOperand <= -1 || this.currentOperand >= 1) {
                    displayError('tanhArc');
                    throw new Error('エラー: 入力は -1 から 1 の範囲である必要があります');
                }
                result = Math.atanh(parseFloat(this.currentOperand));
                break;
            default:
                displayError('notSupportMode');
                throw new Error('エラー: サポートされていないモードです');
        }

        return result;
    }

}

class ErrorHandler {

}

const previousOperandTextElement = document.getElementById('previousOperand');
const currentOperandTextElement = document.getElementById('currentOperand');
const inputFieldTextElement = document.getElementById('inputField');
const buttons = document.querySelectorAll('button');
const resultLog = document.querySelector('.result-log');
const clearLog = document.getElementById('clearLog');

const mathOperation = new MathOperation()
const mathFunction = new MathFunction();
const uiHandler =
    new UIHandler(previousOperandTextElement, currentOperandTextElement);
const operationHandler = new OperationHandler();
const symbolHandler = new SymbolHandler();
const errorHandler = new ErrorHandler();

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        buttonProcess(button);
        logMessages(button);
    });
});

const operators = ['+', '-', '×', '*', '/', '÷'];

const symbols = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', '%', '±',
    'y^x', 'x^2', 'x^3', 'x^y', 'x^2', '10^x',
    'π', 'x!', '1/x', '2√x', '3√x', 'y√x',
    'sin(Deg)', 'cos(Deg)', 'tan(Deg)',
    'sin(Rad)', 'cos(Rad)', 'tan(Rad)',
    'sinh', 'cosh', 'tanh',
    'sin-1', 'cos-1', 'tan-1',
    'sinh-1', 'cosh-1', 'tanh-1',
    'e', 'e^x', 'EE', 'Rand',
    'ln', 'log10', 'logy', 'log2'
];

const errorMessages = {
    'test': 'テストメッセージです',
    'divideByZero': 'エラー: 0 で除算はできません',
    'symbol': 'エラー: Symbolが定義されていません',
    'input': 'エラー: 無効な入力です',
    'nonNegativeInteger': 'エラー: 入力は非負整数でなければなりません',
    'sinDeg': 'エラー: 入力は -90 から 90 の範囲である必要があります',
    'sinRad': 'エラー: 入力は -π/2 から π/2 の範囲である必要があります',
    'sinArc': 'エラー: 入力は -1 から 1 の範囲である必要があります',
    'sinhArc': 'エラー: 入力は 1 以上である必要があります',
    'cosDeg': 'エラー: 入力は -90 から 90 の範囲である必要があります',
    'cosRad': 'エラー: 入力は -π/2 から π/2 の範囲である必要があります',
    'cosArc': 'エラー: 入力は -1 から 1 の範囲である必要があります',
    'coshArc': 'エラー: 入力は 1 以上である必要があります',
    'tanDeg': 'エラー: 入力は 90 の倍数の範囲でなければなりません',
    'tanRad': 'エラー: 入力は π/2 の倍数でなければなりません',
    'tanArc': 'エラー: 入力は -1 から 1 の範囲である必要があります',
    'tanhArc': 'エラー: 入力は -1 から 1 の範囲である必要があります',
    'notSupportMode': 'エラー: サポートされていないモードです',
}

/**---------------button--------------- */
function buttonProcess(button) {
    const buttonText = button.innerText;
    const isNumber = /^[0-9]+$/.test(buttonText);
    const isOperator = operators.includes(buttonText);
    const isSymbol = symbols.includes(buttonText);
    console.log(`buttonText: ${buttonText}`);

    if (isNumber || buttonText === '.') {
        uiHandler.appendNumber(buttonText);
        uiHandler.updateDisplay();
    } else if (isOperator) {
        operationHandler.chooseOperation(buttonText);
        uiHandler.updateDisplay();
    } else if (isSymbol) {
        symbolHandler.transform(buttonText);
        uiHandler.updateDisplay();
    } else if (buttonText === '=') {
        operationHandler.compute();
        uiHandler.updateDisplay();
    } else if (buttonText === 'C') {
        uiHandler.clear();
        uiHandler.updateDisplay();
    } else if (buttonText === 'CE') {
        uiHandler.clearEntries();
        uiHandler.updateDisplay();
    } else if (buttonText === 'CLEAR') {
        const removeParas = document.querySelectorAll('.resultPara');
        const removeErrorParas =
            document.querySelectorAll('.errorPara');
        removeErrorParas.forEach(para => {
            para.remove();
            console.log('Error Logs Cleared');
        });
        removeParas.forEach(para => {
            para.remove();
            console.log('Logs Cleared');
        });
    }
}
/**--------------------------------- */

/**-------- log ---------- */
function logMessages(button) { //! クラス再設定
    const buttonText = button.value;
    const { previousOperand, currentOperand, result } = uiHandler; //分割代入
    const { operator } = operationHandler;

    const logDetails = `
    CurrentOperand: ${currentOperand}
    Operator: ${operator}
    PreviousOperand: ${previousOperand}
    Result: ${result}
    `;

    const displayDetails = `
    <br>CurrentOperand: ${currentOperand}
    <br>Operator: ${operator}
    <br>PreviousOperand: ${previousOperand}
    <br>Result: ${result}
    `;

    const isOperator = ['+', '-', '×', '÷'].includes(operator);
    const messageType = isOperator ? 'AnyOperator' : buttonText === '=' ? 'Equal' : buttonText === 'C' ? 'Cleared' : 'ClearedEntries';

    console.log(messageType + logDetails);
    displayLog(messageType + displayDetails);
}

function displayError(target) {
    const errorMessage = errorMessages[target];
    if (errorMessage) {
        const errorPara = document.createElement('p');
        errorPara.classList.add('errorPara');
        resultLog.appendChild(errorPara);
        errorPara.innerHTML = errorMessage;
        resultLog.scrollTop = resultLog.scrollHeight;

        setTimeout(() => {
            errorPara.style.backgroundColor = 'rgba(255,70,70,0.7)';
        }, 500);
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
                if (numericValue !== null) { //! クラス再設定
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
/**------------------------- */

