export class CalculatorModule {
    private addition(num1: number, num2: number) {
        return num1 + num2
    }

    private subtract(num1: number, num2: number) {
        return num1 - num2
    }

    private operatorList: { [operator: string]: { symbol: string, calculateFn: (num1: number, num2: number) => number } } = {
        "+": { symbol: "+", calculateFn: this.addition },
        "-": { symbol: "-", calculateFn: this.subtract }
    }

    calculate = (calculatorString: string = "") => {
        if (this.isErrorString(calculatorString)) return 0

        var formattedCalculatorString = this.formatCalculatorString(calculatorString)
        let elements = formattedCalculatorString.split(" ")

        if (elements.length == 1) return parseInt(elements[0])

        var total = 0
        var previousOperator = ""
        elements.forEach((element, index) => {
            if (index == 0) { total = total + parseInt(element); return }

            previousOperator = this.getOperator(element) ?? previousOperator
            total = this.calculateOperator(total, element, previousOperator)

        })

        return total
    }

    private isErrorString(string: string) {
        if (string == "") return true
        if (isNaN(parseInt(string))) return true

        return false
    }

    private formatCalculatorString(calculatorString: string) {
        var formattedCalculatorString = calculatorString.trim()

        for (var operator in this.operatorList) {
            formattedCalculatorString = formattedCalculatorString.split(operator).join(` ${operator} `)
        }

        return formattedCalculatorString
    }

    private getOperator(element: string) {
        if (element in this.operatorList) {
            return element
        }
    }

    private calculateOperator(total: number, element: string, operator: string) {
        if (parseInt(element)) {
            if (operator in this.operatorList) {
                total = this.operatorList[operator].calculateFn(total, parseInt(element))
            }
        }

        return total
    }
}