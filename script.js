class Calculator {
    constructor(result) {
        //コンストラクタ(インスタンスで利用するプロパティを初期化する)
        this.result = result;
    }

    //加算
    add(number) {
        this.result += number;
    }

    //減算
    subtract(number) {
        this.result -= number;
    }

    //乗算
    multiply(number) {
        this.result *= number;
    }

    //除算
    divide(number) {
        if (number === 0) {
            throw new Error("0で除算はできません");
        }
        this.result /= number;
    }

    //％
    percent(number) {
        this.result = number * 0.01;
    }

    //±
    plusOrMinus(number) {
        this.result = number * (-1);
    }
    //
    getResult() {
        return this.result;
    }
}

const calculator = new Calculator();

// ボタン要素を取得
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button[data-numbers');
const clear = document.querySelector('button[data-clear]');
const clearEntries = document.querySelector('button[data-clearEntries]');
const operations = document.querySelectorAll('button[data-operation]');
const equal = document.querySelector('button[data-equal]');

let result = document.getElementById('result');
// const buttonStyles = buttons.dataset.numbers;

//* C,CE,%,±,+,-,×,÷,=は表示する必要がない
//TODO メソッド呼び出し -> オペランド(B)で表示`result.value`をリセットする
//? numbers,operationsなどの処理は分けたほうがいい？

// ボタンがクリックされたときの処理を設定
/*buttons.forEach(button => {
    const buttonText = button.innerText; // ボタンのテキストを取得
    button.addEventListener('click', () => {
        // ここで buttonText を使用して処理を行う
        // result.value += buttonText; //`result`に数字を表示する

        // もしオペレータを押したら、`result.value`を変数に格納しディスプレイをクリアし、
        // 各種メソッドを呼び出す
        // ----------
        if (buttonText !== isNaN) { //buttonがNumberであるとき
            console.log(buttonText);
        } else if(buttonText === isNaN){ //buttonがNumberでないとき
            result.value += buttonText;
        }
    });
});*/

numbers.forEach(number => {
    const numbersText = number.innerText;
    number.addEventListener('click', () => {
        console.log(`Number:${numbersText}`);
    });
});

operations.forEach(operation => {
    const operationText = operation.innerHTML;
    operation.addEventListener('click', () => {
        console.log(`Operation:(${operationText})`);
    });
});

clear.addEventListener('click', () => {
    const clearText = clear.innerHTML;
    console.log(`(${clearText}):Clear`);
});

clearEntries.addEventListener('click', () => {
    const ceText = clearEntries.innerHTML;
    console.log(`(${ceText}):ClearEntries`);
});
equal.addEventListener('click', () => {
    const equalText = equal.innerHTML;
    console.log(`(${equalText}):Equal`);
});
