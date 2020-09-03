/***********************************************
 * // GET ELEMENTS
 ***********************************************/
const operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.numbers');
const decimal = document.querySelector('.decimal');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const negate = document.querySelector('.negate');

const lastValue = document.querySelector('#history');
const currentValue = document.querySelector('#current');

let operation;

 /***********************************************
 * // CREATE FUNCTIONS
 ***********************************************/
function getHistory() {return parseFloat(lastValue.innerHTML)}
function getCurrent() {return parseFloat(currentValue.innerHTML)}

function sum(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function percent(a, b) { return (a * (b / 100)); }
function divide(a, b) { return b === 0 ? 'error' : a / b; }

function operate() {
   if(lastValue.innerHTML === ''|| currentValue.innerHTML === '') {
      return;
   }

   let result = window[operation](getHistory(), getCurrent()).toPrecision(16); 
   
   lastValue.innerHTML = result;
   currentValue.innerHTML = '';
   operation = 'null';
}

function getOperation() {
   if(lastValue.innerHTML !== '' && currentValue.innerHTML !== '') {
      operate();
      operation = `${this.id}`; 
      currentValue.innerHTML = '';
   } else if (lastValue.innerHTML === '') {
      lastValue.innerHTML = currentValue.innerHTML;
      currentValue.innerHTML = '';
      operation = `${this.id}`; 
   } else {
      operation = `${this.id}`; 
   }
}

function addDecimal() {
   if(currentValue.innerHTML.includes('.')) {
      return;
   } else if (currentValue.innerHTML === ''){
      currentValue.innerHTML += `0.`;   
   } else {
      currentValue.innerHTML += `.`;
   }
}

function changeSign() {
   if(currentValue.innerHTML !== '') {
      return (currentValue.innerHTML = getCurrent() * -1);
   } else {
      return;
   }
}

function deleteLast() { 
   currentValue.innerHTML = currentValue.innerHTML.slice(0, -1); 
}

function deleteAll() {
   currentValue.innerHTML = '';
   lastValue.innerHTML = '';
}

 /***********************************************
 * // ADD EVENT LISTENERS
 ***********************************************/
operators.forEach(operator => {
   operator.addEventListener('click', getOperation)
})

numbers.forEach(number => {
   number.addEventListener('click', e => {
      if(operation === 'null') {
         lastValue.innerHTML = '';
      }

      currentValue.innerHTML += `${e.target.innerText}`;
   })
})

negate.addEventListener('click', changeSign);

decimal.addEventListener('click', addDecimal);

del.addEventListener('click', deleteLast);

clear.addEventListener('click', deleteAll);

equals.addEventListener('click', operate);


