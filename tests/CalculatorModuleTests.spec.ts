import { expect } from "chai"

class CalculatorModule{
    calculate = (calculatorString: string = "") => {
        if(calculatorString == "") return 0
        if(isNaN(parseInt(calculatorString))) return 0

        return parseInt(calculatorString)
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
})