export default class MathFunction {
    constructor(previous, current, option) {
        this.previous = previous;
        this.current = current;
        this.option = option;
    }

    factorial() {
        const input = parseFloat(this.currentOperand);

        if (Number.isNaN(input)) {
            displayError('input');
            throw new Error('エラー: 無効な入力です');
        }

        if (input < 0 || !Number.isInteger(input)) {
            displayError('nonNegativeInteger');
            throw new Error('エラー： 入力は非負整数でなければなりません。')
        }

        if (input === 0 || input === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= this.currentOperand; i++) {
            result *= i;
        }
        return result;
    }

    rand() {
        return Math.random();
    }

    pi() {
        return Math.PI * parseFloat(this.currentOperand);
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    log() {
        return Math.log(parseFloat(this.currentOperand));
    }

    log10() {
        return Math.log10(parseFloat(this.currentOperand));
    }

    enterExponent() {
        return parseFloat(this.currentOperand).toExponential();
    }

    sin(mode) {
        if (Number.isNaN(this.currentOperand)) {
            displayError('input');
            throw new Error('エラー: 無効な入力です');
        }

        let result;
        switch (mode) {
            case 'degree':
                if (this.currentOperand < -90 || this.currentOperand > 90) {
                    displayError('cosDeg');
                    throw new Error('エラー: 入力は -90 から 90 の範囲である必要があります');
                }
                result = Math.sin(this.degreesToRadians(parseFloat(this.currentOperand)));
                break;
            case 'radian':
                if (this.currentOperand < -Math.PI / 2 || this.currentOperand > Math.PI / 2) {
                    displayError('sinRad');
                    throw new Error('エラー: 入力は -π/2 から π/2 の範囲である必要があります');
                }
                result = Math.sin(parseFloat(this.currentOperand));
                break;
            case 'arc':
                if (this.currentOperand < -1 || this.currentOperand > 1) {
                    displayError('sinArc');
                    throw new Error('エラー: 入力は -1 から 1 の範囲である必要があります');
                }
                result = Math.asin(parseFloat(this.currentOperand));
                break;
            case 'sinh':
                result = Math.sinh(parseFloat(this.currentOperand));
                break;
            case 'sinhArc':
                if (this.currentOperand < 1) {
                    displayError('sinhArc');
                    throw new Error('エラー: 入力は 1 以上である必要があります');
                }
                result = Math.asinh(parseFloat(this.currentOperand));
                break;
            default:
                displayError('notSupportMode');
                throw new Error('エラー: サポートされていないモードです。');
        }

        return result;
    }

    cos(mode) {
        if (Number.isNaN(this.currentOperand)) {
            displayError('input');
            throw new Error('エラー: 無効な入力です');
        }

        let result;
        switch (mode) {
            case 'degree':
                if (this.currentOperand < -90 || this.currentOperand > 90) {
                    displayError('cosDeg');
                    throw new Error('エラー: 入力は -90 から 90 の範囲である必要があります');
                }
                result = Math.cos(this.degreesToRadians(parseFloat(this.currentOperand)));
                break;
            case 'radian':
                if (this.currentOperand < -Math.PI / 2 || this.currentOperand > Math.PI / 2) {
                    displayError('cosRad');
                    throw new Error('エラー: 入力は -π/2 から π/2 の範囲である必要があります');
                }
                result = Math.cos(parseFloat(this.currentOperand));
                break;
            case 'arc':
                if (this.currentOperand < -1 || this.currentOperand > 1) {
                    displayError('cosArc');
                    throw new Error('エラー: 入力は -1 から 1 の範囲である必要があります');
                }
                result = Math.asin(parseFloat(this.currentOperand));
                break;
            case 'cosh':
                result = Math.cosh(parseFloat(this.currentOperand));
                break;
            case 'coshArc':
                if (this.currentOperand < 1) {
                    displayError('coshArc');
                    throw new Error('エラー: 入力は 1 以上である必要があります');
                }
                result = Math.acosh(parseFloat(this.currentOperand));
                break;
            default:
                displayError('notSupportMode');
                throw new Error('エラー: サポートされていないモードです');
        }

        return result;
    }

    tan(mode) {
        if (Number.isNaN(this.currentOperand)) {
            displayError('input');
            throw new Error('エラー: 無効な入力です');
        }

        let result;
        switch (mode) {
            case 'degree':
                if (this.currentOperand % -90 === 45 || this.currentOperand % 90 === -45) {
                    displayError('tanDeg');
                    throw new Error('エラー: 入力は 90 の倍数の範囲でなければなりません');
                }
                result = Math.tan(this.degreesToRadians(parseFloat(this.currentOperand)));
                break;
            case 'radian':
                if (Math.abs(this.currentOperand) % (Math.PI / 2) === Math.PI / 4) {
                    displayError('tanRad');
                    throw new Error('エラー: 入力は π/2 の倍数でなければなりません');
                }
                result = Math.tan(parseFloat(this.currentOperand));
                break;
            case 'arc':
                if (this.currentOperand < -1 || this.currentOperand > 1) {
                    displayError('tanArc');
                    throw new Error('エラー: 入力は -1 から 1 の範囲である必要があります');
                }
                result = Math.atan(parseFloat(this.currentOperand));
                break;
            case 'tanh':
                result = Math.tanh(parseFloat(this.currentOperand));
                break;
            case 'tanhArc':
                if (this.currentOperand <= -1 || this.currentOperand >= 1) {
                    displayError('tanhArc');
                    throw new Error('エラー: 入力は -1 から 1 の範囲である必要があります');
                }
                result = Math.atanh(parseFloat(this.currentOperand));
                break;
            default:
                displayError('notSupportMode');
                throw new Error('エラー: サポートされていないモードです');
        }

        return result;
    }

}