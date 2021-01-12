import { expect } from "chai"

class CalculatorModule{
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
        if(this.isErrorString(calculatorString)) return 0

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

    private isErrorString(string: string){
        if (string == "") return true
        if (isNaN(parseInt(string))) return true

        return false
    }

    private formatCalculatorString(calculatorString: string){
        var formattedCalculatorString = calculatorString.trim()

        for (var operator in this.operatorList) {
            formattedCalculatorString = formattedCalculatorString.split(operator).join(` ${operator} `)
        }

        return formattedCalculatorString
    }

    private getOperator(element: string){
        if (element in this.operatorList) {
            return element
        }
    }

    private calculateOperator(total: number, element: string, operator: string){
        if (parseInt(element)) {
            if (operator in this.operatorList) {
                total = this.operatorList[operator].calculateFn(total, parseInt(element))
            }
        } 

        return total
    }
}

describe("Test CalculatorModule behaviour", function(){
    it("test_calculate_noInput_returnZero", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate()

        expect(result).to.be.equal(0)
    })

    it("test_calculate_singleNumber_returnTheSingleNumber", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("5")

        expect(result).to.be.equal(5)
    })

    it("test_calculate_characterTyped_returnZero", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("abcde")

        expect(result).to.be.equal(0)
    })

    it("test_calculate_doubleSameOperatorAddition_returnResult_omitPreviousOperator", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("1++1")

        expect(result).to.be.equal(2)
    })

    it("test_calculate_moreThanTwoSameOperatorAddition_returnResult_omitPreviousOperator", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("1+++1")

        expect(result).to.be.equal(2)
    })

    it("test_calculate_doubleSameOperatorSubtract_returnResult_omitPreviousOperator", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("1--1")

        expect(result).to.be.equal(0)
    })

    it("test_calculate_moreThanTwoSameOperatorSubtract_returnResult_omitPreviousOperator", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("4---1")

        expect(result).to.be.equal(3)
    })

    it("test_calculate_additionOftwoNumber_returnTheResult", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("3 + 2")

        expect(result).to.be.equal(5)
    })

    it("test_calculate_additionOftwoNumber_returnTheResult", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("3 + 2 + 4")

        expect(result).to.be.equal(9)
    })

    it("test_calculate_subtractOfTwoNumber_returnTheResult", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("10 - 5")

        expect(result).to.be.equal(5)
    })

    it("test_calculate_withAdditionAndSubtractOfCoupleOfNumber_returnTheResult", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("10 - 5 + 12 - 1 + 3")

        expect(result).to.be.equal(19)
    })
})