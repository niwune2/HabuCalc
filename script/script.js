class Calculator {
    constructor() {
        // コンストラクタでプロパティを初期化
        this.pre = 0;
        this.next = null;
        this.selectedOperand = null;
        this.result = null;
    }

    setOperand(value) {
        if (this.selectedOperand === null) {
            this.pre = parseFloat(value);
        } else {
            this.next = parseFloat(value);
        }
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
let selectedOperand = null;

// Calculatorクラスのインスタンスを作成
const calculator = new Calculator();

// console.log(`nextStage:${nextStage}`);
    //* オペレータボタンを押したときに'number'になる
    //* 数字ボタンを押したときに'number'になる

//* C,CE,%,±,+,-,×,÷,=は表示する必要がない
//TODO メソッド呼び出し -> オペランド(B)で表示`result.value`をリセットする

// アクティビティ図の流れに従い、押せるボタン/押せないボタンを
// `nextStage`の値に従ってスイッチできるようにする
//? スクリプトでHTMLを弄って無効化/有効化は可能か？
    //! `disabled`属性が使える -> 使えない.イベントリスナーを消す必要がある
    // 無効化: `button.disabled = true;`,有効化: button.disabled = false;
//* 要は、`operator`のときには数字だけ、`number`のときにはオペレータだけ入力できるようにしたい
//// 2023/09/24: とりあえずは、オペレータを押した後のオペランドAの扱いを設定する

// 数字ボタンのクリックイベント
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const numberText = number.getAttribute('data-numbers');
        if (result.value === '0') {
            result.value = numberText;
        } else {
            result.value += numberText;
        }
    });
});

/*
result.value = '0';
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const numberText = number.getAttribute('data-numbers');

        //* 条件に応じて各オペランドを変数に格納する
        if (firstOperand !== null && nextStage === 'number') {
            result.value = '';
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
*/

// 演算子ボタンのクリックイベント
operations.forEach(operator => {
    operator.addEventListener('click', () => {
        const operatorText = operator.innerHTML;
        calculator.setOperand(result.value);
        calculator.selectedOperand = operatorText;
        console.log(operatorText);
        result.value = '0';
            //オペランドAはオペレータ押下時まで保持する
    });
});
/*
operations.forEach(operator => {
    operator.addEventListener('click', () => {
        const opeText = operator.innerHTML;
        if (firstOperand === null) {
            // fOperandがnullのとき、そこに表示値を格納する
            firstOperand = result.value;
        } else if (secondOperand === null) {
            // sOperandがnullのとき、そこに表示値を格納する
            secondOperand = result.value;
        }

        //? 2023-09-25: これらが押された時、firstOperandに格納する?
            // 1. オペランドAを入力済み
            // 2. オペレータを押下時に(1.)をfirstOperandに格納
            // 3. 押下したオペレータのメソッドにfirstOperandを代入する
            //! どうやってメソッドに代入すればいい？？？
        switch (opeText) {
            case '+':
                console.log(`Pushed '+'`);
                selectedOperand = '+';//! 試し
                break;
            case '-':
                console.log(`Pushed '-'`);
                break;
            case '÷':
                console.log(`Pushed '÷'`);
                break;
            case '×':
                console.log(`Pushed '×'`);
                break;
            case '%':
                console.log(`Pushed '%'`);
                break;
            case '±':
                console.log(`Pushed '±'`);
                break;
            default:
                console.log(`他のオペレータが押された...?`);
        }

        nextStage = 'number';
        console.log(`nextStage:${nextStage}, selectedOperand:${selectedOperand}`);
    });
});
*/

clear.addEventListener('click', () => {
    console.log(`(${clear.innerHTML}):Clear`);
    // 履歴も含めてすべて消去する
    // firstOperandをnullにする
    // secondOperandをnullにする
    // メソッドの選択をリセットする

});

clearEntries.addEventListener('click', () => {
    console.log(`(${clearEntries.innerHTML}):ClearEntries`);
    // 現在表示されている数値のみを消去する
    // result.valueを0にする
        //数字入力時にnumbersイベントと同じく置き換える

});

// イコールボタンのクリックイベント
equal.addEventListener('click', () => {
    calculator.setOperand(result.value);
    calculator.add(); // 他の演算子に対する呼び出しも追加
    result.value = calculator.getResult().toString();
});
/*
equal.addEventListener('click', () => {
    console.log(`(${equal.innerHTML}):Equal`);
    // 条件に当てはまるときのみ押せるようにする
        // オペランドA,Bがnullではない
        // オペレータが選択済みである
    //? 選択されたメソッドをどう呼び出す???
    // どのオペレータ(メソッド)が選ばれたか
        // 1. 変数に保存する
        // 2. switchで値のオペレータに応じてオペランドの値をメソッドに代入する
    switch (selectedOperand) {
        case '+':
            const adds = calculator.add();
            console.log(adds);
    }


    if (secondOperand === null) {
        // sOperandがnullのとき、そこに表示値を格納する
        secondOperand = result.value;
    }
    console.log(`FirstOperand:${firstOperand}, SecondOperand:${secondOperand}`);
});
*/