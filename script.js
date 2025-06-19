const operationBttn = document.querySelectorAll(".operationBttn");
const numberBttn = document.querySelectorAll(".numberBttn");
const equalsToBttn = document.querySelector(".equalsToBttn");
const clearBttn = document.querySelector(".clearBttn");

let addStringNumbers = "";
let operator = "";
let operandVal = 0;
let counter = 0;
let result = 0;
let flag = false;

const trackOperands = [];

numberBttn.forEach((e) => {
  e.addEventListener("click", handleNumberBttnFn);
});

operationBttn.forEach((e) => {
  e.addEventListener("click", handleOperationBttnFn);
});

equalsToBttn.addEventListener("click", handleResultOperation);

clearBttn.addEventListener("click", clearOutFn);

function handleNumberBttnFn(e) {
  if (flag) return;
  const number = e.target.innerHTML;
  addStringNumbers += number;
}

function handleOperationBttnFn(e) {
  if (addStringNumbers) {
    trackOperands.push(Number(addStringNumbers));
    counter++;
  }
  if (trackOperands.length > 1) {
    counter++;
    arithmeticOperation();
  }
  operator = e.target.innerHTML;

  flag = false;
  addStringNumbers = "";
  arithmeticOperation();
}

function arithmeticOperation() {
  if (counter > 1) {
    // console.log(counter, operator, trackOperands);
    counter = 1;
    switch (operator) {
      case "+":
        result = trackOperands.reduce((val1, val2) => {
          return val1 + val2;
        });
        break;
      case "-":
        result = trackOperands.reduce((val1, val2) => {
          return val1 - val2;
        });
        break;
      case "*":
        result = trackOperands.reduce((val1, val2) => {
          return val1 * val2;
        });
        break;
      case "/":
        result = trackOperands.reduce((val1, val2) => {
          return val1 / val2;
        });
        break;
    }
    operator = "";
    trackOperands.length = [];
    trackOperands.push(result);
    console.log(result);
  }
  return;
}

function handleResultOperation() {
  if (addStringNumbers && operator) {
    trackOperands.push(Number(addStringNumbers));
    counter++;
    flag = true;
    addStringNumbers = "";
  }
  arithmeticOperation();
}

function clearOutFn() {
  addStringNumbers = "";
  operator = "";
  operandVal = 0;
  counter = 0;
  result = 0;
  flag = false;
  trackOperands.length = [];
}
