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
        this.operatorRegex = new RegExp(`([${regexCommand}])`)
    }

    calculate = (formula: string = "") => {
        if (this.isErrorString(formula)) return 0
        var formattedCalculatorString = this.formatFormula(formula)

        let formulaAfterFirstTierOperator = this.calculateFirstTierOperator(formattedCalculatorString)
        return this.calculateLastTierOperator(formulaAfterFirstTierOperator)
    }

    private calculateFirstTierOperator = (formula: string) => {
        let formulaElements = formula.split(/(\+)/g)
        if (formulaElements[0] == "") formulaElements.shift()
        if (formulaElements[formulaElements.length - 1] == "") formulaElements.pop()

        
        var formula = ""

        formulaElements.forEach( elements => {
            if(elements.match(/\*|\//g)){
                formula += `${this.calculateLastTierOperator(elements)}`
            }
            else{
                formula += `${elements}`
            }
        })
        console.log("Uncalculated Formula: " + formulaElements)
        console.log("Formula: " + formula)
        return formula
    }

    private calculateLastTierOperator = (formula: string) => {
        let elements = formula.replace(this.operatorRegex, ",$1,").split(",")
        if (elements.length == 1) return parseInt(elements[0])

        var total = 0
        let operator = elements[1]

        if (operator in this.operatorList) {
            total = this.operatorList[operator].calculateFn(isNaN(parseInt(elements[0])) ? 0 : parseInt(elements[0]), this.calculateLastTierOperator(elements[2]))
        }
        return total
    }

    private isErrorString(string: string) {
        if (string == "") return true
        if (string.match(/[a-z]/g)) return true

        return false
    }

    private formatFormula(formula: string) {
        var formattedFormula = formula.trim()
        if(formattedFormula[formattedFormula.length-1].match(/\+|-/g)) formattedFormula += "0"
        
        while (formattedFormula.match(/--/g) != null) {
            formattedFormula = formattedFormula.replace(/--/g, "+")
        }
        formattedFormula = formattedFormula.replace(/-/g, "+-").replace(/\s/g, "")
        while (formattedFormula.match(/\+\+/g) != null) {
            formattedFormula = formattedFormula.replace(/\+\+/g, "+")
        }

        return formattedFormula
    }
}