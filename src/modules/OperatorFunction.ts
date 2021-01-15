export interface OperatorFunction {
    symbol: string
    calculateFn: (num1: number, num2: number) => number
}

export class AdditionOperatorFunction implements OperatorFunction {
    symbol = "+"

    calculateFn = (num1: number, num2: number) => {
        return num1 + num2
    }
}

export class MultiplicationOperatorFunction implements OperatorFunction {
    symbol = "*"

    calculateFn = (num1: number, num2: number) => {
        return num1 * num2
    }
}

export class DivisionOperatorFunction implements OperatorFunction {
    symbol = "/"

    calculateFn = (num1: number, num2: number) => {
        return num1 / num2
    }
}