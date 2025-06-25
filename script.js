const operationBttn = document.querySelectorAll(".operationBttn");
const numberBttn = document.querySelectorAll(".numberBttn");
const equalsToBttn = document.querySelector(".equalsToBttn");
const clearBttn = document.querySelector(".clearBttn");
const displayValues = document.querySelector(".displayValues");
const trackOperands = [];
let addStringNumbers = "";
let operator = "";
let operandVal = 0;
let counter = 0;
let result = 0;
let flag = false;
let stringToDisplay = "";

numberBttn.forEach((e) => {
  e.addEventListener("click", handleNumberBttnFn);
});

operationBttn.forEach((e) => {
  e.addEventListener("click", handleOperationBttnFn);
});

equalsToBttn.addEventListener("click", handleResultOperation);

clearBttn.addEventListener("click", clearOutFn);

function handleNumberBttnFn(e) {
  if (stringToDisplay === "INVALID") stringToDisplay = "";
  if (flag) return;
  const number = e.target.innerHTML;
  if (number === "." && addStringNumbers.includes(".")) {
    return;
  }
  addStringNumbers += number;
  displayFn(number);
}

function handleOperationBttnFn(e) {
  if (isNaN(Number(addStringNumbers))) {
    clearOutFn();
    return;
  }
  if (addStringNumbers) {
    trackOperands.push(Number(addStringNumbers));
    counter++;
  }
  if (trackOperands.length > 1) {
    counter++;
    arithmeticOperation();
  }
  operator = e.target.innerHTML;
  if (stringToDisplay) displayFn(operator);
  flag = false;
  addStringNumbers = "";
  arithmeticOperation();
}

function arithmeticOperation() {
  if (counter > 1) {
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
        if (trackOperands[1] === 0) {
          clearOutFn();
          displayFn("INVALID");
          return;
        }
        result = trackOperands.reduce((val1, val2) => {
          return val1 / val2;
        });
        break;
    }
    operator = "";
    trackOperands.length = [];
    result = parseFloat(result.toFixed(8));
    trackOperands.push(result);
    displayValues.innerHTML = "";
    stringToDisplay = "";
    displayFn(String(result));
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
  displayValues.innerHTML = "";
  stringToDisplay = "";
  displayFn("");
}

function displayFn(str) {
  const operandStr = "+-*/";
  const lastChar = stringToDisplay.charAt(stringToDisplay.length - 1);
  if (operandStr.includes(str) && operandStr.includes(lastChar)) {
    stringToDisplay = stringToDisplay.replace(lastChar, "");
  }
  stringToDisplay += str;
  displayValues.innerHTML = stringToDisplay;
}
