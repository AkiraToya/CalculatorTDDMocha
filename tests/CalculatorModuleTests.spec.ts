import { expect } from "chai"

class CalculatorModule{
    result = 0

    calculate = () => {
        return 0
    }
}

describe("Test CalculatorModule behaviour", function(){
    it("test_init_doNothing", () => {
        let sut = new CalculatorModule()
        expect(sut.result).to.be.equal(0)
    })

    it("test_calculate_noInput_returnZero", () => {
        let sut = new CalculatorModule()
        let result = sut.calculate()

        expect(result).to.be.equal(0)
    })
})