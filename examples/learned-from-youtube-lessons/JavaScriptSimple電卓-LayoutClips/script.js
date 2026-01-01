const display = document.getElementById('output');

function set(numbers) {
    display.textContent += numbers.textContent;
}

function calc() {
    display.textContent = new Function('return ' + display.textContent)();
}

function reset() {
    display.textContent = '';
}