import { expect } from "chai"
import { CalculatorModule } from "../src/modules/CalculatorModule"

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