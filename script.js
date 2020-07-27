let currentScreenValue = "";

const buttons = Array.from(document.querySelectorAll("th"));
buttons.forEach(button => button.addEventListener('click', (e) => {
    let textContent = e.target.textContent;

    if (e.target.id != "screen" && parseInt(textContent) < 10 && parseInt(textContent) > -1) {
        currentScreenValue += textContent;

        this.updateScreen();
    }
}));

function updateScreen() {
    const screen = document.getElementById("screen");

    screen.textContent = currentScreenValue;
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
        console.warn("Dividing with 0");

        return null;
    }

    return number1 / number2;
}

function operate(operator, number1, number2) {
    switch (operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
        default:
            return "No such operator";
    }
}