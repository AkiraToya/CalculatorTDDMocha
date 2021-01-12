import { expect } from "chai"

class CalculatorModule{
    result = 0
}

describe("Test CalculatorModule behaviour", function(){
    it("test_init_doNothing", () => {
        let sut = new CalculatorModule()
        expect(sut.result).to.be.equal(0)
    })
})