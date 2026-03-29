const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let currentInput = "";
const operators = ["+", "-", "*", "/"];

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-value");
        const lastChar = currentInput.slice(-1);

        if (btn.id === "clear") {
            currentInput = "";
            display.value = "";
        } else if (btn.id === "equals") {
            try {
                display.value = eval(currentInput);
                currentInput = display.value;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        } else {
            if (operators.includes(value) && operators.includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
            display.value = currentInput;
        }
    });
});
document.addEventListener("keydown", (e) => {
    const lastChar = currentInput.slice(-1);

    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
        currentInput += e.key;
    } else if (operators.includes(e.key)) {
        if (operators.includes(lastChar)) {
            currentInput = currentInput.slice(0, -1) + e.key;
        } else {
            currentInput += e.key;
        }
    } else if (e.key === "Enter") {
        try {
            display.value = eval(currentInput);
            currentInput = display.value;
        } catch {
            display.value = "Error";
            currentInput = "";
        }
        return;
    } else if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
    } else if (e.key.toLowerCase() === "c") {
        currentInput = "";
    }

    display.value = currentInput;
});