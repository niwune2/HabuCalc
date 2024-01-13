const preOpeTE = document.getElementById('previousOperand');
const curOpeTE = document.getElementById('currentOperand');
const inputText = document.getElementById('inputField');

const buttons = document.querySelectorAll('button');
const resultLog = document.querySelector('.result-log');
const clearLog = document.getElementById('clearLog');

let current = '';
let operator = null;
let previous = '';
let result = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttonProcess(button);
        console.log(button.innerText);
    });
});

const operators = ['+', '-', '×', '*', '/', '÷'];
function buttonProcess(button) {
    const text = button.innerText;
    const isNumber = /^[0-9]+$/.test(text);
    const isOperator = operators.includes(text);
}

function appendNumber(number) {
    if (number === '.' && current.includes('.')) { return; }
    current = current.toString() + number.toString();
}

function chooseOperation(ope) {
    if (current === '') { return; }
    if (previous !== '') { result; }

    operator = operator;
    previous = current;
    current = '';
}

function updateDisplay() {
    curOpeTE.value = getDisplayNumber(current);

    if (operator != null) {
        preOpeTE.value = `${getDisplayNumber(previous)} ${operator}`;
    } else {
        preOpeTE.value = '';
    }
}

function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
    }

    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}