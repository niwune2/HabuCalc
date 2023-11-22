export default class SymbolHandler {
    constructor (symbol) {
        this.symbol = symbol;
    }

    transform(symbol) {
        if (this.currentOperand === '') {
            return;
        }

        switch (symbol) {
            case '%':
                console.log('symbol: %');
                this.currentOperand = mathOperation.percent;
                break;
            case '±':
                this.currentOperand = mathOperation.plusOrMinus;
                break;
            case 'x^2':
                this.currentOperand = this.exponentiation(2);
                break;
            case 'x^3':
                this.currentOperand = this.exponentiation(3);
                break;
            case 'x^y': //!
                // this.currentOperand = this.exponentiation();
                // 第三の数値の入力を受け付ける機能が必要
                break;
            case '10^x':
                this.currentOperand = this.powerOf10();
                break;
            case 'e':
                this.currentOperand = this.napier();
                break;
            case 'e^x':
                this.currentOperand = this.napierExp();
                break;
            case 'x!':
                this.currentOperand = this.factorial();
                break;
            case '1/x':
                this.currentOperand = this.reciprocal();
                break;
            case '2√x':
                this.currentOperand = this.squareRoot();
                break;
            case '3√x':
                this.currentOperand = this.cubedRoot();
                break;
            case 'y√x': //!
                this.currentOperand = this.root();
            case 'ln':
                this.currentOperand = this.log();
                break;
            case 'log10':
                this.currentOperand = this.log10();
                break;
            case 'logy': //!
                this.currentOperand = this.log();
                break;
            case 'log2':
                this.currentOperand = this.log();
                break;
            case 'sin(Rad)':
                this.currentOperand = this.sin('radian');
                break;
            case 'sin(Deg)':
                this.currentOperand = this.sin('degree');
                break;
            case 'sin-1':
                this.currentOperand = this.sin('arc');
                break;
            case 'sinh':
                this.currentOperand = this.sin('sinh');
                break;
            case 'sinh-1':
                this.currentOperand = this.sin('sinhArc');
                break;
            case 'cos(Rad)':
                this.currentOperand = this.cos('radian');
                break;
            case 'cos(Deg)':
                this.currentOperand = this.cos('degree');
                break;
            case 'cos-1':
                this.currentOperand = this.cos('arc');
                break;
            case 'cosh':
                this.currentOperand = this.cos('cosh');
                break;
            case 'cosh-1':
                this.currentOperand = this.cos('coshArc');
                break;
            case 'tan(Rad)':
                this.currentOperand = this.tan('radian');
                break;
            case 'tan(Deg)':
                this.currentOperand = this.tan('degree');
                break;
            case 'tan-1':
                this.currentOperand = this.tan('arc');
                break;
            case 'tanh':
                this.currentOperand = this.tan('tanh');
                break;
            case 'tanh-1':
                this.currentOperand = this.tanh('tanhArc');
                break;
            case 'π':
                this.currentOperand = this.pi();
                break;
            case 'Rand':
                this.currentOperand = this.rand();
                break;
            case 'EE':
                this.currentOperand = this.enterExponent();
                break;
            default:
                errorMessages('symbol');
                throw new Error('Symbolが定義されていません');
        }
    }

}
