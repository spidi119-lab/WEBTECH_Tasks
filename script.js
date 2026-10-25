function addValue(value) {
    let display = document.getElementById("display");
    display.value = display.value + value;
    display.focus();
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteNumber() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
    display.focus();
}

function calculate() {
    let display = document.getElementById("display");
    let expression = display.value.trim();

    if (expression === "") {
        return;
    }

    // Allow only numbers, arithmetic operators, decimal points and parentheses.
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        display.value = "Error";
        return;
    }

    try {
        let result = Function('"use strict"; return (' + expression + ')')();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = String(Number(result.toPrecision(12)));
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Let Enter calculate and Escape clear the display when typing directly.
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
