import { expect } from "chai"

class CalculatorModule{
    calculate = (calculatorString: string = "") => {
        if(calculatorString == "") return 0
        if(isNaN(parseInt(calculatorString))) return 0

        let formattedCalculatorString = calculatorString.trim().split("+").join(" + ")
        let elements = formattedCalculatorString.split(" ")

        if (elements.length == 1) return parseInt(elements[0])

        var total = 0
        var previousOperator = ""
        elements.forEach( (element, index)  => {
            if (index == 0){ total = total + parseInt(element); return } 

            if(element == "+"){ previousOperator = "+"; return }
            if(element == "-"){ previousOperator = "-"; return }

            if (parseInt(element)){
                if(previousOperator == "+") total += parseInt(element)
                else if(previousOperator == "-") total -= parseInt(element)
            } 
        })

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

    it("test_calculate_doubleSameOperator_returnResult_omitPreviousOperator", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("1++1")

        expect(result).to.be.equal(2)
    })

    it("test_calculate_moreThanTwoSameOperator_returnResult_omitPreviousOperator", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("1+++1")

        expect(result).to.be.equal(2)
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