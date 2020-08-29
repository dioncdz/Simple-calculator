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
function getHistory() {return parseFloat(lastValue.innerHTML);}
function getCurrent() {return parseFloat(currentValue.innerHTML);}

function sum(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate() {
   if(lastValue.innerHTML === ''|| currentValue.innerHTML === '') {
      return;
   }

   let result; 

   if(operation === 'sum') {
      result = sum(getHistory(), getCurrent());
   } 

   else if (operation === 'subtract') {
      result = subtract(getHistory(), getCurrent());
   }

   else if (operation === 'multiply') {
      result = multiply(getHistory(), getCurrent());
   }

   else if (operation === 'divide') {
      result = divide(getHistory(), getCurrent());
   }

   // UPDATE UI
   lastValue.innerHTML = result;
   currentValue.innerHTML = '';
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

function deleteLast() { currentValue.innerHTML = currentValue.innerHTML.slice(0, -1); }

function deleteAll() {
   currentValue.innerHTML = '';
   lastValue.innerHTML = '';
}

 /***********************************************
 * // ADD EVENT LISTENERS
 ***********************************************/
operators.forEach(operator => {
   operator.addEventListener('click', e => {
      if(e.target.classList.contains('plus')) {
         if(lastValue.innerHTML !== '' && currentValue.innerHTML !== '') {
            operate();
            operation = 'sum'; 
            currentValue.innerHTML = '';
         } else if (lastValue.innerHTML === '') {
            lastValue.innerHTML = currentValue.innerHTML;
            currentValue.innerHTML = '';
            operation = 'sum'; 
         } 

      } 
      else if (e.target.classList.contains('minus')) {
         if(lastValue.innerHTML !== '' && currentValue.innerHTML !== '') {
            operate();
            operation = 'subtract'; 
            currentValue.innerHTML = '';
         } else if (lastValue.innerHTML === '') {
            lastValue.innerHTML = currentValue.innerHTML;
            currentValue.innerHTML = '';
            operation = 'subtract'; 
         } 
      }
      else if (e.target.classList.contains('multiply')) {
         if(lastValue.innerHTML !== '' && currentValue.innerHTML !== '') {
            operate();
            operation = 'multiply'; 
            currentValue.innerHTML = '';
         } else if (lastValue.innerHTML === '') {
            lastValue.innerHTML = currentValue.innerHTML;
            currentValue.innerHTML = '';
            operation = 'multiply'; 
         } 
      }
      else if (e.target.classList.contains('divide')) {
         if(lastValue.innerHTML !== '' && currentValue.innerHTML !== '') {
            operate();
            operation = 'divide'; 
            currentValue.innerHTML = '';
         } else if (lastValue.innerHTML === '') {
            lastValue.innerHTML = currentValue.innerHTML;
            currentValue.innerHTML = '';
            operation = 'divide'; 
         } 
      }
   })
})

numbers.forEach(number => {
   number.addEventListener('click', e => {
      currentValue.innerHTML += `${e.target.innerText}`;
      console.dir(e.target.innerText);
   })
})

decimal.addEventListener('click', addDecimal)

del.addEventListener('click', deleteLast)

clear.addEventListener('click', deleteAll)

equals.addEventListener('click', operate)


