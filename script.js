const billInput = document.querySelector('.bill-input');
const peopleInput = document.querySelector('.people-input');
const tipPerPerson = document.getElementById('tip-amount');
const totalPerPerson = document.getElementById('total-amount');

billInput.value = '0.0';
peopleInput.value = '1';
tipPerPerson.innerHTML =  "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML =  "$" + (0.0).toFixed(2);

