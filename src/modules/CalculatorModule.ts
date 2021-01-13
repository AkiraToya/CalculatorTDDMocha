export interface OperatorList{
    [operator: string]: OperatorFunction
}

interface OperatorFunction{
    symbol: string
    calculateFn: (num1: number, num2: number) => number
}

export class AdditionOperatorFunction implements OperatorFunction{
    symbol = "+"

    calculateFn = (num1: number, num2: number) => {
        return num1 + num2
    }
}

export class MultiplicationOperatorFunction implements OperatorFunction{
    symbol = "*"

    calculateFn = (num1: number, num2: number) => {
        return num1 * num2
    }
}

export class CalculatorModule {
    private operatorList: OperatorList
    private operatorRegex: RegExp

    constructor(operatorList: OperatorList){
        this.operatorList = operatorList

        var regexCommand = ""
        for (let operator in this.operatorList) {
            regexCommand += operator
        }
        this.operatorRegex = new RegExp(`([${regexCommand}])`)
    }

    calculate = (calculatorString: string = "") => {
        if (this.isErrorString(calculatorString)) return 0
        var formattedCalculatorString = this.formatCalculatorString(calculatorString)

        return this.processCalculate(formattedCalculatorString)
    }

    private processCalculate = (calculatorString: string) => {
        let elements = calculatorString.replace(this.operatorRegex, ",$1,").split(",")
        if (elements.length == 1) return parseInt(elements[0])

        var total = 0
        let operator = elements[1]

        if (operator in this.operatorList) {
            total = this.operatorList[operator].calculateFn(isNaN(parseInt(elements[0])) ? 0 : parseInt(elements[0]), this.processCalculate(elements[2]))

        }
        return total
    }

    private isErrorString(string: string) {
        if (string == "") return true
        if (string.match(/[a-z]/g)) return true

        return false
    }

    private formatCalculatorString(calculatorString: string) {
        var formattedCalculatorString = calculatorString.trim()
        formattedCalculatorString = formattedCalculatorString.replace(/--/g, "+").replace(/-/g, "+-").replace(/\s/g, "")
        return formattedCalculatorString
    }
}