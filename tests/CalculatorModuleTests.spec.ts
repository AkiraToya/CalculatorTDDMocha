import { expect } from "chai"
import { CalculatorModule, OperatorList } from "../src/modules/CalculatorModule"

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

    it("test_calculate_moreThanTwoSameOperatorAddition_returnResult_omitPreviousOperator", () => {
        let sut = makeSUT()
        let result = sut.calculate("1+++1")

        expect(result).to.be.equal(2)
    })

    it("test_calculate_doubleSameOperatorSubtract_returnResult_omitPreviousOperator", () => {
        let sut = makeSUT()
        let result = sut.calculate("1--1")

        expect(result).to.be.equal(0)
    })

    it("test_calculate_moreThanTwoSameOperatorSubtract_returnResult_omitPreviousOperator", () => {
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

    // MARK: HELPER
    function makeSUT(): CalculatorModule{
        let addition = (num1: number, num2: number) => {
            return num1 + num2
        }

        let subtract = (num1: number, num2: number) => {
            return num1 - num2
        }

        let operatorList: OperatorList = {
            "+": { symbol: "+", calculateFn: addition },
            "-": { symbol: "-", calculateFn: subtract }
        }
        let sut = new CalculatorModule(operatorList)
        return sut
    }
})