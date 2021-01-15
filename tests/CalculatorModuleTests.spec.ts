import { expect } from "chai"
import { CalculatorModule } from "../src/modules/CalculatorModule"
import { CalculatorBuilder } from "../src/modules/CalculatorBuilder"

describe("Test CalculatorModule behaviour", function(){
    it("test_calculate_noInput_returnZero", () => {
        let sut = makeSUT()
        let result = sut.calculate()

        expect(result).to.be.equal(0)
    })

    it("test_calculate_singleNumber_returnTheSingleNumber", () => {
        let sut = makeSUT()
        let result = sut.calculate("5")

        expect(result).to.be.equal(5)
    })

    it("test_calculate_characterTyped_returnZero", () => {
        let sut = makeSUT()
        let result = sut.calculate("abcde")

        expect(result).to.be.equal(0)
    })

    it("test_calculate_doubleSameOperatorAddition_returnResult_omitPreviousOperator", () => {
        let sut = makeSUT()
        let result = sut.calculate("1++1")

        expect(result).to.be.equal(2)
    })

    it("test_calculate_moreThanTwoSameOperatorAddition_returnResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("1+++1")

        expect(result).to.be.equal(2)
    })

    it("test_calculate_doubleSameOperatorSubtract_returnResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("1--1")

        expect(result).to.be.equal(2)
    })

    it("test_calculate_moreThanTwoSameOperatorSubtract_returnResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("4---1")

        expect(result).to.be.equal(3)
    })

    it("test_calculate_additionOftwoNumber_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("3 + 2")

        expect(result).to.be.equal(5)
    })

    it("test_calculate_additionOftwoNumber_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("3 + 2 + 4")

        expect(result).to.be.equal(9)
    })

    it("test_calculate_subtractOfTwoNumber_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("10 - 5")

        expect(result).to.be.equal(5)
    })

    it("test_calculate_withAdditionAndSubtractOfCoupleOfNumber_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("10 - 5 + 12 - 1 + 3")

        expect(result).to.be.equal(19)
    })

    it("test_calculate_multiplicationOfTwoNumber_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("10 * 5")

        expect(result).to.be.equal(50)
    })

    it("test_calculate_withMixAdditionAndMultiplicationOfNumbers_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("3 + 10 * 5")

        expect(result).to.be.equal(53)
    })

    it("test_calculate_withMixAdditionAndMultiplicationOfNumbersWhenMultiplicationOnTheFront_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("10 * 5 + 3")

        expect(result).to.be.equal(53)
    })

    it("test_calculate_divisionOfTwoNumber_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("10 / 5")

        expect(result).to.be.equal(2)
    })

    it("test_calculate_withMixAdditionAndDivisionOfNumbersWhenDivisionOnTheFront_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("10 / 5 + 3")

        expect(result).to.be.equal(5)
    })

    it("test_calculate_formulaWithOperatorEndingWithAddorSub_shouldGetZeroInTheEnd", () => {
        let sut = makeSUT()
        expect(sut.calculate("10 + 5 + 3 +")).to.be.equal(18)
        expect(sut.calculate("10 + 5 + 3 -")).to.be.equal(18)
    })

    it("test_calculate_formulaWithOperatorEndingWithMultiplicationOrDivision_shouldGetOneInTheEnd", () => {
        let sut = makeSUT()
        expect(sut.calculate("10 + 5 + 3 *")).to.be.equal(18)
        expect(sut.calculate("10 + 5 + 3 /")).to.be.equal(18)
    })

    it("test_calculate_withMixAdditionSubtractionMultiplicationAndDivision_returnTheResult", () => {
        let sut = makeSUT()
        let result = sut.calculate("10 / 5 + 3 * 2 - 7 + 9 / 3 + 30 + 10 - 5 / 5 * 3")
        expect(result).to.be.equal(41)
    })

    // MARK: HELPER
    function makeSUT(): CalculatorModule{
        
        let sut = new CalculatorBuilder().build()
        return sut
    }
})