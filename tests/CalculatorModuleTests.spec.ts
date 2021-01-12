import { expect } from "chai"

class CalculatorModule{
    private result = 0

    calculate = (calculatorString: string = "") => {
        if(calculatorString == "") return 0
        
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
})