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

let nextStage = 'operator';
console.log(`nextStage:${nextStage}`);
    //* オペレータボタンを押したときに'number'になる
    //* 数字ボタンを押したときに'number'になる

//* C,CE,%,±,+,-,×,÷,=は表示する必要がない
//TODO メソッド呼び出し -> オペランド(B)で表示`result.value`をリセットする

result.value = '0';
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const numberText = number.getAttribute('data-numbers');
        if (result.value === '0' && numberText === '00') {
            result.value = '0';
        } else if (
            (result.value === '0' && numberText !== '00') ||
            (result.value === '0' && numberText !== '0')
        ) {
            if (numberText === '.') {
                result.value = '0.';
            } else {
                result.value = numberText;
            }
        } else if (
            (result.value.indexOf('.') !== -1) &&
            (numberText === '.')
        ) {
            return;
        } else {
            result.value += numberText;
        }
    });
});

let calcHistory = null;
operations.forEach(operator => {
    operator.addEventListener('click', () => {
        const opeText = operator.innerHTML;
        // console.log(`Operator:(${opeText})`);
        calcHistory = result.value;//前オペランドを格納
        console.log(`Operand:${result.value}`);
        switch (opeText) {
            case '+':
                console.log(`Pushed "+"`);
                console.log(`History:${calcHistory}`);
                break;
            case '-':
                console.log(`Pushed "-"`);
                break;
            case '÷':
                console.log(`Pushed "÷"`);
                break;
            case '×':
                console.log(`Pushed "×"`);
                break;
            case '%':
                console.log(`Pushed "%"`);
                break;
            case '±':
                console.log(`Pushed "±"`);
                break;
            default:
                console.log(`他のオペレータが押された...?`);
        }

        nextStage = 'number';
        console.log(`nextStage:${nextStage}`);
    });
});
//? 1. 数字(オペランド(A))を押した
//? 2. オペレーターを押した
//?     1. オペランド(A)を変数`firstOperand`に格納する
//? 3. 数字を押すと、その数字をオペランド(B)の入力を受け付ける
//?     1. オペランド(B)を変数`secondOperand`に格納する
//? 4. オペレータかイコールか
//?     1. `nextStage`変数で、次のアクションを示す
//?     2. オペレータが押された時`nextState = 'number';`
//?        数字が押されたとき`nextState = 'operator';`
//?     3. `number`ならオペレータを入力させる.
//?        `operator`なら数字を入力させる
//! 分岐点(operator or equal)
//? 5. オペレータを押すことで...
//?     1. `nextStage`を`number`に変更
//?     ?. 一時的な結果を`temporaryResult`として表示
//?     3. オペランド(B)を変数`secondOperand`に格納
//?     4. `firstOperand`をメソッドの第一引数にする <- ??
//?     ?. 一時的な結果を`firstOperand`に代入
//! 分岐点(number or operand)
//? 6. イコールを押すことで...
//?     1. `nextStage`を変更
//?     2. メソッドの計算結果を表示する

clear.addEventListener('click', () => {
    console.log(`(${clear.innerHTML}):Clear`);
    //履歴も含めてすべて消去する

});

clearEntries.addEventListener('click', () => {
    console.log(`(${clearEntries.innerHTML}):ClearEntries`);
    //現在表示されている数値のみを消去する

});

equal.addEventListener('click', () => {
    console.log(`(${equal.innerHTML}):Equal`);
    // 条件に当てはまるときのみ押せるようにする
});
