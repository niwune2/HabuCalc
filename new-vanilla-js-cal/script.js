// ボタン要素を取得
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button[data-numbers');
const clear = document.querySelector('button[data-clear]');
const cE = document.querySelector('button[data-clearEntries]');
const operations = document.querySelectorAll('button[data-operation]');
const equal = document.querySelector('button[data-equal]');

let result = document.getElementById('result');
// const buttonStyles = buttons.dataset.numbers;

// ボタンがクリックされたときの処理を設定
buttons.forEach(button => {
    const buttonText = button.innerText; // ボタンのテキストを取得
    button.addEventListener('click', () => {
        console.log(`ボタンのテキストは: ${buttonText}`);
        // ここで buttonText を使用して処理を行う
        result.value = buttonText; //`result`に数字を表示する
    });
});

numbers.forEach(number => {
    const numbersText = number.innerText;
    number.addEventListener('click', () => {
        console.log(`Number:${numbersText}`);
    });
});

