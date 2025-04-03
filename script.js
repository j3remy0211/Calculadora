const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipPerPerson = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-amount");
const tips = document.querySelectorAll(".tips");
const tipCustom = document.querySelector(".tip-custom");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tips.forEach(function(val) {
    val.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", tipInputFun);
resetBtn.addEventListener("click", reset);

billInput.value = "0.0";
peopleInput.value = "1";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFun() {
    billValue = parseFloat(billInput.value) || 0;

    if (billValue < 0) {
        billValue = 0;
        billInput.value = "0.0";
    }
    calculateTip();
}

function peopleInputFun() {
    peopleValue = parseFloat(peopleInput.value) || 0;

    if (peopleValue < 1) {
        error.style.display = "flex";
        peopleInput.style.border = "thick solid red";
        peopleValue = 1;
        peopleInput.value = "1";
    } else {
        error.style.display = "none";
        peopleInput.style.border = "none";
        calculateTip();
    }
}

function billInputFun() {
    billValue = parseFloat(billInput.value) || 1;

    if (billValue < 1) {
        error.style.display = "flex";
        billInput.style.border = "thick solid red";
        billValue = 1;
        billInput.value = "1";
    } else {
        error.style.display = "none";
        billInput.style.border = "none";
        calculateTip();
    }
}


function tipInputFun() {
    tipValue = parseFloat(tipCustom.value) / 100 || 0;
    tips.forEach(function(val) {
        val.classList.remove("active-tip");
    });
    calculateTip();
}

function handleClick(event) {
    tips.forEach(function(val) {
        val.classList.remove("active-tip");
        if (event.target.innerHTML == val.innerHTML) {
            val.classList.add("active-tip");
            tipValue = parseFloat(val.innerHTML) / 100;
        }
    });
    calculateTip();
}

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + tipAmount) / peopleValue;
        tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = "$" + total.toFixed(2);
    }
}

function reset() {
    billInput.value = "0.0";
    billInputFun();
    peopleInput.value = "1";
    peopleInputFun();
    tipCustom.value = "";
}

billInput.addEventListener("focus", function() {
    billInput.placeholder = "";
});

billInput.addEventListener("blur", function() {
    if (billInput.value.trim() === "") {
        billInput.placeholder = "0.0";
    }
});

tipCustom.addEventListener("focus", function() {
    tipCustom.placeholder = "";
});

tipCustom.addEventListener("blur", function() {
    tipCustom.placeholder = "CUSTOM";
});
