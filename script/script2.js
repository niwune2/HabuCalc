class Calculator {
    constructor() {
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
        this.result = this.pre + this.next;
        return this.result;
    }

    subtract() {
        this.result = this.pre - this.next;
        return this.result;
    }

    multiply() {
        this.result =  this.pre * this.next;
        return this.result;
    }

    divide() {
        if (this.next === 0) {
            throw new Error("0で除算はできません");
        }
        this.result = this.pre / this.next;
        return this.result;
    }

    percent() {
        this.result = this.pre * 0.01;
        return this.result;
    }

    plusOrMinus() {
        this.result = -this.pre;
        return this.result;
    }

    getResult() {
        return this.result;
    }
}

const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('button[data-numbers');
const clear = document.querySelector('button[data-clear]');
const clearEntries = document.querySelector('button[data-clearEntries]');
const operations = document.querySelectorAll('button[data-operation]');
const equal = document.querySelector('button[data-equal]');
const result = document.getElementById('result');

let nextStage = 'operator';
let firstOperand = null; //?
let secondOperand = null; //?
let temporaryResult = null; //?
let selectedOperand = null; //?

// Calculatorクラスのインスタンスを作成
const calculator = new Calculator();

result.value = '0';
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const numberText = number.getAttribute('data-numbers');
        if (result.value === '0') {// 表示値が0の時...
            result.value = numberText;// 数値を表示し...
        } else {// 以降は数値を後ろに追加する.
            result.value += numberText;
        }


    });
});

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