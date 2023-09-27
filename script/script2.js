class Calculator {
    constructor() {
        this.pre = 0;
        this.next = null;
        this.selectedOperator = null;
        this.result = null;
    }

    setOperand(value) { //オペランドに代入する
        if (this.selectedOperator === null) {
            // 演算子が未選択のとき...
            this.pre = parseFloat(value);
            // オペランドAに表示値を代入
        } else {
            // 演算子が選択済みのとき...
            this.next = parseFloat(value);
            // オペランドBに表示値を代入
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
        this.result = this.pre * this.next;
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
        // %を押下後...
        // 即座に結果を表示し...
        // その結果をオペランドとして扱う
    }

    plusOrMinus() {
        this.result = -this.pre;
        return this.result;
    }

    getResult() {
        return this.result;
    }
}

const numbers = document.querySelectorAll('button[data-numbers');
const tForms = document.querySelectorAll('button[data-transformation]');
const clear = document.querySelector('button[data-clear]');
const clearEntries = document.querySelector('button[data-clearEntries]');
const operations = document.querySelectorAll('button[data-operation]');
const equal = document.querySelector('button[data-equal]');
const result = document.getElementById('result');

// Calculatorクラスのインスタンスを作成
const calculator = new Calculator();

result.value = '0';
numbers.forEach(number => {
    number.addEventListener('click', () => {
        const numberText = number.getAttribute('data-numbers');
        if (result.value === '0' && numberText === '00') {
            // 0の時,00を押しても...
            result.value = '0';// 0のまま.
        } else if (
            (result.value === '0' && numberText !== '00') ||
            (result.value === '0' && numberText !== '0')) {
            // 0の時,0か00以外を押した時に...
            if (numberText === '.') {// '.'を押すと...
                result.value = '0.';// '0.'を表示.
            } else { // '.'を押さないときは...
                result.value = numberText;// 数字を表示.
            }
        } else if (
            (result.value.indexOf('.') !== -1) && // 表示に'.'があり...
            (numberText === '.')) { //かつ'.'が入力されたら...
            return; //何もしない.
        } else { // 以上の条件に当てはまらないとき...
            result.value += numberText; //数字を後ろに追加する
        }
    });
});

let transformNumber = null;
tForms.forEach(transfomer => {
    transfomer.addEventListener('click', () => {
        const tForm = transfomer.innerHTML;
        calculator.setOperand(result.value); //?
        console.log(`Transfomrer:(${tForm})`);
        switch (transformNumber) {
            //! 押下後、結果をオペランドにしなければいけない
            case '%':
                calculator.percent();
                result.value = calculator.getResult().toString();
                break;
            case '±':
                calculator.plusOrMinus();
                result.value = calculator.getResult().toString();
                break;
            default:
                console.error(`意図しないオペレータ:TransformEvent`);
        }
    });
});

let currentOperator = null;
operations.forEach(operator => {
    operator.addEventListener('click', () => {
        const operatorText = operator.innerHTML;
        calculator.setOperand(result.value);
        calculator.selectedOperator = currentOperator = operatorText;
        result.value = '0';
        //オペランドAはオペレータ押下時まで保持する
        console.log(`currentOperator:${currentOperator}`);
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

    switch (currentOperator) {
        case '+':
            calculator.add();
            result.value = calculator.getResult().toString();
            break;
        case '-':
            calculator.subtract();
            result.value = calculator.getResult().toString();
            break;
        case '÷':
            calculator.divide();
            result.value = calculator.getResult().toString();
            break;
        case '×':
            calculator.multiply();
            result.value = calculator.getResult().toString();
            break;
        default:
            console.error(`意図しないオペレータ:EqualEvent`);
    }
});