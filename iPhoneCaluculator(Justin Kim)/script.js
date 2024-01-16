// DOM Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const number0El = document.querySelector('.number-0');

const numberElArray = [
    number0El, number1El, number2El, number3El, number4El, number5El, number6El, number7El, number8El, number9El
];

// Functions
const getValueAsStr = () => valueEl.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setSrtAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        valueEl.textContent += '.';
        return;
    }

    const [wholeNumSrt, decimalSrt] = valueStr.split('.');
    if (decimalSrt) {
        valueEl.textContent = parseFloat(wholeNumSrt).toLocaleString() + '.' + decimalSrt;
    } else {
        valueEl.textContent = parseFloat(wholeNumSrt).toLocaleString();
    }
};

const handleNumberClick = (numSrt) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
        setSrtAsValue(numSrt);
    } else {
        setSrtAsValue(currentValueStr + numSrt);
    }
};

// Add Event Listener to functions
//! decimalの入力にエラーあり
//! Youtube ~1:21:47

// Add Event Listener to numbers and decimal
for (let i = 0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}

decimalEl.addEventListener('click' ,() => {
    const currentValueStr = getValueAsStr();
    valueEl.textContent = currentValueStr + '.';
    if (!currentValueStr.includes('.')) {
        setSrtAsValue(currentValueStr + '.')
    }
});



// Set up the time
const updateTime = () => {
    const currentTime = new Date();
    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour > 12) {
        currentHour -= 12;
    }

    hourEl.textContent = currentHour.toString();;
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}

setInterval((updateTime), 1000);
updateTime();