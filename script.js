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

// ボタン要素を取得
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button[data-numbers');
const clear = document.querySelector('button[data-clear]');
const clearEntries = document.querySelector('button[data-clearEntries]');
const operations = document.querySelectorAll('button[data-operation]');
const equal = document.querySelector('button[data-equal]');
const result = document.getElementById('result');

let nextStage = 'operator';
let firstOperand = null;
let secondOperand = null;
let temporaryResult = null;

// console.log(`nextStage:${nextStage}`);
    //* オペレータボタンを押したときに'number'になる
    //* 数字ボタンを押したときに'number'になる

//* C,CE,%,±,+,-,×,÷,=は表示する必要がない
//TODO メソッド呼び出し -> オペランド(B)で表示`result.value`をリセットする

// -----ボタンの有効化,無効化を切り替える条件分を書く------

// const filteredOperations = [];
// operations.forEach(operator => {
//     filteredOperations.push(operator.innerHTML);
//     //? 条件に適合するときだけ都度pushする?
// });
// const filteredNumbers = [];
// numbers.forEach(number => {
//     filteredNumbers.push(number.innerHTML);
// });

// console.log(`Ope:${filteredOperations}, Num:${filteredNumbers}`);

// if (nextStage === 'number') {
//     filteredOperations.disabled = true;
//     operations.forEach(operator => {
//         // operator.disabled = true; // ボタンを無効にする
//         operator.style.backgroundColor = 'black'; // スタイルを設定する
//     });
// } else if (nextStage = 'operator'){
//     filteredNumbers.disabled = true;
//     numbers.forEach(number => {
//         number.style.backgroundColor = 'black';
//     });
// }


// アクティビティ図の流れに従い、押せるボタン/押せないボタンを
// `nextStage`の値に従ってスイッチできるようにする
//? スクリプトでHTMLを弄って無効化/有効化は可能か？
    //! `disabled`属性が使える -> 使えない.イベントリスナーを消す必要がある
    // 無効化: `button.disabled = true;`,有効化: button.disabled = false;
//* 要は、`operator`のときには数字だけ、`number`のときにはオペレータだけ入力できるようにしたい
//// 2023/09/24: とりあえずは、オペレータを押した後のオペランドAの扱いを設定する

// -------------------------------------------------

result.value = '0';
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const numberText = number.getAttribute('data-numbers');

        if (firstOperand !== null && nextStage === 'number') {
            result.value = '';
            console.log(`F:${firstOperand}, S:${secondOperand}`);
        } else if (secondOperand !== null) {
            result.value = '';
        }

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

        nextStage = 'operator';
        console.log(`nextStage:${nextStage}`);
    });
});

let calcHistory = null; //?
operations.forEach(operator => {
    operator.addEventListener('click', () => {
        const opeText = operator.innerHTML;
        // console.log(`Operator:(${opeText})`);
        calcHistory = result.value;//前オペランドを格納
        if (firstOperand === null) {
            firstOperand = result.value;//
        } else if (secondOperand === null) {
            secondOperand = result.value;
            console.log(`FirstOperand:${firstOperand}, SecondOperand:${secondOperand}`);
        }

        // console.log(`Operand:${result.value}`);
        switch (opeText) {
            case '+':
                console.log(`Pushed "+"`);
                // console.log(`History:${calcHistory}`);
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
