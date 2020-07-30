const maxSymbols = 10;
let currentScreenValue = "0";
let firstNumber = null;
let secondNumber = null;
let operator = "";

const buttons = Array.from(document.querySelectorAll("th"));
buttons.forEach(button => button.addEventListener('click', (e) => {
    let textContent = e.target.textContent;

    if (e.target.id != "screen" && e.target.id != "reset") {
        if (parseInt(textContent) < 10 && parseInt(textContent) > -1) {
            if (currentScreenValue.length >= maxSymbols) {
                return;
            }

            if (currentScreenValue == "0" && !currentScreenValue.includes(".")) {
                currentScreenValue = textContent;
            } else {
                currentScreenValue += textContent;
            }

            this.updateScreen(currentScreenValue);
        } else {
            if (textContent == "=") {
                if (firstNumber == null) {
                    return;
                }

                secondNumber = parseFloat(currentScreenValue);

                let result = this.operate(operator, firstNumber, secondNumber);

                this.updateScreen(result);
            } else if (textContent == ".") {
                if (currentScreenValue.includes(".")) {
                    return;
                }

                currentScreenValue += textContent;

                this.updateScreen(currentScreenValue);
            } else {
                if (currentScreenValue == "0" && textContent == "/") {
                    this.updateScreen("Division with 0? Do you want to split the universe??");

                    return;
                }

                if (operator.length == 0) {
                    firstNumber = parseFloat(currentScreenValue);

                    operator = textContent;

                    currentScreenValue = "0";
                } else {
                    secondNumber = parseFloat(currentScreenValue);

                    let tmp = this.operate(operator, firstNumber, secondNumber);

                    this.updateScreen(tmp);

                    firstNumber = tmp;
                    secondNumber = 0;

                    operator = textContent;
                    currentScreenValue = "0";
                }
            }
        }
    } else if (e.target.id == "reset") {
        currentScreenValue = "0";
        firstNumber = null;
        secondNumber = null;
        operator = "";

        this.updateScreen("0");
    }
}));

function updateScreen(value) {
    const screen = document.getElementById("screen");

    if (typeof value == "number") {
        value = value.toExponential(5);
    }

    screen.textContent = value;
}

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    if (number1 == 0 || number2 == 0) {
        return 0;
    }

    return number1 / number2;
}

/**
 * @function operate
 * @param operator
 * @param number1
 * @param number2
 * @returns {number}
 */

function operate(operator, number1, number2) {
    let result = 0;

    switch (operator) {
        case "+":
            result = add(number1, number2);
            break;
        case "-":
            result = subtract(number1, number2);
            break;
        case "*":
            result = multiply(number1, number2);
            break;
        case "/":
            result = divide(number1, number2);
            break;
        default:
            console.warn("No such operator");
    }

    result = Math.round((result + Number.EPSILON) * 100) / 100;

    return result;
}