import { CalculatorModule, OperatorList } from "./CalculatorModule"
import { AdditionOperatorFunction, MultiplicationOperatorFunction } from "./OperatorFunction"

export class CalculatorBuilder{
    setupOperatorList = () => {
        let operatorList: OperatorList = {
            "+": new AdditionOperatorFunction(),
            "*": new MultiplicationOperatorFunction()
        }

        return operatorList
    }

    build = () => {
        return new CalculatorModule(this.setupOperatorList())
    }
}