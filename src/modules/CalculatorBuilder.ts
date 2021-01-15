import { CalculatorModule, OperatorList } from "./CalculatorModule"
import { AdditionOperatorFunction, MultiplicationOperatorFunction, DivisionOperatorFunction } from "./OperatorFunction"

export class CalculatorBuilder{
    setupOperatorList = () => {
        let operatorList: OperatorList = {
            "+": new AdditionOperatorFunction(),
            "*": new MultiplicationOperatorFunction(),
            "/": new DivisionOperatorFunction()
        }

        return operatorList
    }

    build = () => {
        return new CalculatorModule(this.setupOperatorList())
    }
}