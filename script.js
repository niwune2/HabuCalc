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
const result = document.getElementById('result');
// const buttonStyles = buttons.dataset.numbers;

//* C,CE,%,±,+,-,×,÷,=は表示する必要がない
//* 初期の表示は`0`
//TODO メソッド呼び出し -> オペランド(B)で表示`result.value`をリセットする
//// クリア状態では`00`と`0`は押せないようにする
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

//TODO 小数点のあつかい
//TODO 1. 小数点を押した時、自動的に'0.'と表示する
//TODO 2. 2個以上の小数点を入力できないようにする
//TODO 3. 小数点以下の桁数の制限
//TODO 4. エラーハンドリングの実装
// デフォルト状態(0が表示された状態)では、
// 小数点を最初に入力したとき、
// 画面上の数値を"0."にしたい
//! なにをしても”0.”と表示しないのはスコープのせい???

let calcHistory = [];
result.value = '0';
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const numberText = number.getAttribute('data-numbers'); // 押された数字
        console.log(`Number:${numberText}`);

        if (result.value === '0' && numberText === '00' ) {
            // すでに '0' が表示されている場合は
            // '00'を入力しても'0'を表示する
            console.log(result.value, numberText, 'A');
            result.value = '0';
        } else if (
            (result.value === '0' && numberText !== '00') ||
            (result.value === '0' && numberText !== '0')
        ) {//!
            // 表示が'0'かつ入力が'00'または
            // 表示が'0'かつ入力が'0'のとき
            // 表示の'0'を'.'か'0~9'までの数字に置換
            //? '.'を入力したとき、ここで引っかかる
            //? ここにifの入れ子を仕込むか??
            console.log(result.value, numberText, 'B');
            result.value = numberText;
            // result.value を更新
        } else if (result.value === '0' && numberText === '.') {
            // 0が表示されており、かつ'.'を入力したとき
            // 末尾に'.'を追加する
            console.log(result.value, numberText, 'C');
            // result.value.replace('0','0.');
            result.value = '0a.';
        } else if (result.value.indexOf('.') !== -1 && numberText === '.') {
            // 既に小数点が含まれている場合、'.'を追加しない
            console.log(result.value, numberText, 'D');
            return;
            //? index(0,2)以降の'.'を調べてそれらを除く?
        } else {
            // 数字を連続して入力する
            console.log(result.value, numberText, 'E');
            result.value += numberText; // result.value を更新
        }
        console.log('--------------------');
    });
});



operations.forEach(operator => {
    operator.addEventListener('click', () => {
        console.log(`Operator:(${operator.innerHTML})`);
    });
});

clear.addEventListener('click', () => {
    console.log(`(${clear.innerHTML}):Clear`);
});

clearEntries.addEventListener('click', () => {
    console.log(`(${clearEntries.innerHTML}):ClearEntries`);
});

equal.addEventListener('click', () => {
    console.log(`(${equal.innerHTML}):Equal`);
});

//? 計算式は配列にいれるか
//? 配列に入れるのであれば`=`->`C`の操作で配列をリセットできるようにする必要がありそう
//? あるいは計算式ごとに配列を作るか?
//? 計算式が何もない状態を判定する必要がありそう(もし配列が空なら...)
