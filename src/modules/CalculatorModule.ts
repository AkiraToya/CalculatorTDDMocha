import { FormulaFormatter } from "./FormulaFormatter"
import { OperatorFunction } from "./OperatorFunction"

export interface OperatorList{
    [operator: string]: OperatorFunction
}

export class CalculatorModule {
    private operatorList: OperatorList
    private operatorRegex: RegExp

    constructor(operatorList: OperatorList){
        this.operatorList = operatorList

        var regexCommand = ""
        for (let operator in this.operatorList) {
            regexCommand += operator
        }
        this.operatorRegex = new RegExp(`(.*)([${regexCommand}])`)
    }

    calculate = (formula: string = "") => {
        if (this.isErrorString(formula)) return 0
        var formattedCalculatorString = new FormulaFormatter().format(formula)

        let formulaAfterFirstTierOperator = this.calculateFirstTierOperator(formattedCalculatorString)
        return this.calculateLastTierOperator(formulaAfterFirstTierOperator)
    }

    private calculateFirstTierOperator = (formula: string) => {
        let formulaElements = formula.split(/(\+)/g)
        this.cleanUpFormulaElements(formulaElements)

        return this.getSimpleFormula(formulaElements)
    }

    private getSimpleFormula(formulaElements: string[]){
        var formula = ""

        formulaElements.forEach(elements => {
            if (elements.match(/\*|\//g)) {
                formula += `${this.calculateLastTierOperator(elements)}`
                return
            }

            formula += `${elements}`
        })

        return formula
    }

    private cleanUpFormulaElements(formulaElements: string[]){
        if (formulaElements[0] == "") formulaElements.shift()
        if (formulaElements[formulaElements.length - 1] == "") formulaElements.pop()

        return formulaElements
    }

    private calculateLastTierOperator = (formula: string) => {
        let elements = formula.replace(this.operatorRegex, "$1,$2,").split(",")
        if (elements.length == 1) return parseInt(elements[0])

        var total = 0
        let operator = elements[1]

        if (operator in this.operatorList) {
            let calculateOperator = this.operatorList[operator].calculateFn
            let lastElement = isNaN(parseInt(elements[2])) ? 0 : parseInt(elements[2])
            total = calculateOperator(this.calculateLastTierOperator(elements[0]), lastElement)
        }
        return total
    }

    private isErrorString(string: string) {
        if (string == "") return true
        if (string.match(/[a-z]/g)) return true

        return false
    }
}