import { expect } from "chai"

class CalculatorModule{
    calculate = (calculatorString: string = "") => {
        if(calculatorString == "") return 0
        if(isNaN(parseInt(calculatorString))) return 0
        if(calculatorString.trim().split("++").length > 1) return 0

        let numbersInString = calculatorString.trim().split("+")

        if(numbersInString.length == 1) return parseInt(numbersInString[0])

        let numbers: number[] = numbersInString.map( value => parseInt(value) )
        return numbers.reduce( (sum, curValue) => sum + curValue, 0 )
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

    it("test_calculate_doubleOperator_returnZero", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("1++1")

        expect(result).to.be.equal(0)
    })

    it("test_calculate_moreThanTwoOperator_returnZero", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate("1+++1")

        expect(result).to.be.equal(0)
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
})