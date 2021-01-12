import { expect } from "chai"

class CalculatorModule{
    private result = 0

    calculate = () => {
        return 0
    }
}

describe("Test CalculatorModule behaviour", function(){
    it("test_calculate_noInput_returnZero", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate()

        expect(result).to.be.equal(0)
    })
})