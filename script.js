class Calculator {
    constructor(pre, next, result) {
        // コンストラクタでプロパティを初期化
        this.pre = pre;
        this.next = next;
        this.result = result;
    }

    add() {
        // `pre`はコンストラクタで設定された前オペランド
        // `next`はコンストラクタで設定された次のオペランド
        // 加算した数値を返す
        this.result = this.pre + this.next;
        return this.result;
    }

    subtract() { //減算
        this.result = this.pre - this.next;
        return this.result;
    }

    multiply() { //乗算
        this.result =  this.pre * this.next;
        return this.result;
    }

    divide() { //除算
        if (this.next === 0) {
            throw new Error("0で除算はできません");
        }
        this.result = this.pre / this.next;
        return this.result;
    }

    percent() { //％
        this.result = this.pre * 0.01;
        return this.result;
    }

    plusOrMinus() { //±
        this.result = -this.pre;
        return this.result;
    }

    getResult() { // result
        return this.result;
    }
}

const calculator = new Calculator(20, 10);
console.log(`addition: ${calculator.add()}`);
console.log(`subtraction: ${calculator.subtract()}`);
console.log(`multiplication: ${calculator.multiply()}`);
console.log(`division: ${calculator.divide()}`);
console.log(`percent: ${calculator.percent()}`);
console.log(`plusMinus: ${calculator.plusOrMinus()}`);
console.log('--------------------');


// ボタン要素を取得
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button[data-numbers');
const clear = document.querySelector('button[data-clear]');
const clearEntries = document.querySelector('button[data-clearEntries]');
const operations = document.querySelectorAll('button[data-operation]');
const equal = document.querySelector('button[data-equal]');
const result = document.getElementById('result');

//* C,CE,%,±,+,-,×,÷,=は表示する必要がない
//* 初期の表示は`0`
//TODO メソッド呼び出し -> オペランド(B)で表示`result.value`をリセットする

result.value = '0';
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const numberText = number.getAttribute('data-numbers'); // 押された数字
        // console.log(`Number:${numberText}`);
        if (result.value === '0' && numberText === '00') {
            // すでに '0' が表示されている場合は
            // '00'を入力しても'0'を表示する
            console.log(result.value, numberText, 'A');
            result.value = '0';
        } else if (
            (result.value === '0' && numberText !== '00') ||
            (result.value === '0' && numberText !== '0')
        ) {
            // 表示が'0'かつ入力が'00'または
            // 表示が'0'かつ入力が'0'のとき
            // 表示の'0'を'.'か'0~9'までの数字に置換
            if (numberText === '.') {
                result.value = '0.';
                console.log(result.value, numberText, 'Ba');
            } else {
                result.value = numberText;
                console.log(result.value, numberText, 'Bb');
            }
            // result.value を更新
        } else if (result.value.indexOf('.') !== -1 && numberText === '.') { // 既に小数点が含まれている場合、'.'を追加しない
            console.log(result.value, numberText, 'C');
            return;
        } else { // 数字を連続して入力する
            console.log(result.value, numberText, 'D');
            result.value += numberText; // result.value を更新
        }
        console.log('--------------------');
    });
});

let calcHistory = null;
operations.forEach(operator => {
    operator.addEventListener('click', () => {
        console.log(`Operator:(${operator.innerHTML})`);
        calcHistory = result.value;//前オペランドを格納
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
