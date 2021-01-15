export class FormulaFormatter{
    format = (formula: string) => {
        return this.formatFormula(formula)
    }

    private formatFormula(formula: string) {
        var formattedFormula = formula.trim()
        formattedFormula = this.fixFormulaEndWithOperator(formattedFormula)
        formattedFormula = this.fixMinusOperator(formattedFormula)
        formattedFormula = this.fixDoubleOperator(formattedFormula)

        return formattedFormula
    }

    private fixFormulaEndWithOperator(formula: string) {
        if (formula[formula.length - 1].match(/\+|-/g)) formula += "0"
        if (formula[formula.length - 1].match(/\*|\//g)) formula += "1"

        return formula
    }

    private fixMinusOperator(formula: string) {
        while (formula.match(/--/g) != null) {
            formula = formula.replace(/--/g, "+")
        }
        formula = formula.replace(/-/g, "+-").replace(/\s/g, "")

        return formula
    }

    private fixDoubleOperator(formula: string) {
        while (formula.match(/\+\+/g) != null) {
            formula = formula.replace(/\+\+/g, "+")
        }

        while (formula.match(/\*\*/g) != null) {
            formula = formula.replace(/\*\*/g, "*")
        }

        while (formula.match(/\/\//g) != null) {
            formula = formula.replace(/\/\//g, "/")
        }

        return formula
    }
}