const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipPerPerson = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-amount");
const tips = document.querySelectorAll(".tips");
const tipCustom = document.querySelector(".tip-custom");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");

// Eventos de entrada y clics
billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tips.forEach(val => val.addEventListener("click", handleClick));
tipCustom.addEventListener("input", tipInputFun);
resetBtn.addEventListener("click", reset);

// Valores iniciales
billInput.value = "";
peopleInput.value = "";
tipCustom.value = "";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0;
let peopleValue = 1;
let tipValue = 0.15;

// Validación para el input de bill
function billInputFun() {
    if (billInput.value.trim() === "") {
        billValue = 0;
        
    } else {
        billValue = parseFloat(billInput.value);
        billInput.classList.remove("error-input");
        if (isNaN(billValue) || billValue < 0) {
            billInput.classList.add("error-input");
            billValue = 0;
            billInput.value = "";
        }
    }

    calculateTip();
}

// Validación para el número de personas
function peopleInputFun() {
    if (peopleInput.value.trim() === "") return;

    peopleValue = parseInt(peopleInput.value);
    if (isNaN(peopleValue) || peopleValue < 1) {
        peopleInput.classList.add("error-input");
        peopleValue = 1;
        peopleInput.value = "1";
    } else {
        peopleInput.classList.remove("error-input");
    }

    calculateTip();
}

// Validación para CUSTOM Tip
function tipInputFun() {
    if (tipCustom.value.trim() === "") {
        tipValue = 0.15; // Restaurar al valor predeterminado
        tipCustom.classList.remove("error-input");
    } else {
        let inputValue = parseFloat(tipCustom.value);
        if (isNaN(inputValue) || inputValue < 0) {
            tipCustom.classList.add("error-input");
            tipCustom.value = "";
        } else {
            tipCustom.classList.remove("error-input");
            tipValue = inputValue / 100;
        }
    }

    tips.forEach(val => val.classList.remove("active-tip"));
    calculateTip();
}

// Función para manejar clics en los botones de propinas
function handleClick(event) {
    tips.forEach(val => val.classList.remove("active-tip"));
    event.target.classList.add("active-tip");
    tipValue = parseFloat(event.target.innerHTML) / 100;
    tipCustom.value = "";
    tipCustom.classList.remove("error-input");
    calculateTip();
}

// Cálculo de la propina
function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + tipAmount) / peopleValue;
        tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = "$" + total.toFixed(2);
    }
}

// Función para el botón RESET
function reset() {
    billInput.value = "";
    peopleInput.value = "";
    tipCustom.value = "";
    tipPerPerson.innerHTML = "$0.00";
    totalPerPerson.innerHTML = "$0.00";

    billInput.classList.remove("error-input");
    peopleInput.classList.remove("error-input");
    tipCustom.classList.remove("error-input");

    calculateTip();
}

// Evitar que los usuarios escriban valores negativos
tipCustom.addEventListener("input", function () {
    if (this.value.includes("-")) {
        this.value = this.value.replace("-", ""); 
    }
});

// Mejor manejo de placeholders
billInput.addEventListener("focus", () => billInput.placeholder = "");
billInput.addEventListener("blur", () => {
    if (billInput.value.trim() === "") billInput.placeholder = "0";
});

peopleInput.addEventListener("focus", () => peopleInput.placeholder = "");
peopleInput.addEventListener("blur", () => {
    if (peopleInput.value.trim() === "") peopleInput.placeholder = "1";
});

tipCustom.addEventListener("focus", () => tipCustom.placeholder = "");
tipCustom.addEventListener("blur", () => {
    tipCustom.placeholder = "CUSTOM";
});
