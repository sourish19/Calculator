const operationBttn = document.querySelectorAll(".operationBttn");
const numberBttn = document.querySelectorAll(".numberBttn");
const displayValues = document.querySelector(".displayValues");

let valuesToDisplay = "";
let operand1 = "";
let operand2 = "";
let operator = null;

// FUNCTION TO DISPLAY THE VALUES IN THE SCREEN
const displayOperation = (e) => {
  valuesToDisplay = valuesToDisplay + e.innerText;
  displayValues.innerText = valuesToDisplay;
};

//CLEAR DISPLAY FUNCTION
const clearDisplay = () => {
  operand1 = "";
  operand2 = "";
  operator = null;
  valuesToDisplay = "";
};

//  + - * / OPERATION
const operation = (operator, operand1, operand2) => {
  if (!operand1 || !operand2) {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
    }
  }
};

const undoValues = () => {
  console.log("operand2", operand2);

  if (!operand2 == "") {
    console.log("hi");

    operand2 = operand2.slice(0, -1);
    console.log("operand2 after", operand2);

    valuesToDisplay = valuesToDisplay.slice(0, -1);
    displayValues.innerText = valuesToDisplay;
  }
  console.log("operand1", operand1);
  console.log("operator", operator);
  console.log("valueToDisplay", valuesToDisplay);
};

//  + - * / DETERMIN OPERATOR
const arithmaticValue = (e) => {
  if (e.innerText === "") {
    console.log(e.innerHTML);
    undoValues();
  } else if (e.innerText === "C") {
    displayValues.innerHTML = "";
    clearDisplay();
  } else if (operand1 != "" && operator == null) {
    operator = e.innerText;
    displayOperation(e);
  }
};

const operandValue = (e) => {
  if (e.innerText === "=") {
    let result = operation(operator, Number(operand1), Number(operand2));
    console.log(result);

    displayValues.innerText = result;
    clearDisplay();
    result = null;
  } else if (e.innerText == ".") {
    if (operand1 != "" && !operand1.includes(".")) {
      operand1 += e.innerText;
      displayOperation(e);
    }
    if (operand2 != "" && !operand2.includes(".")) {
      operand2 += e.innerText;
      displayOperation(e);
    }
  } else if (operator != null && operand1 != "") {
    operand2 += e.innerText;
    displayOperation(e);
  } else {
    operand1 += e.innerText;
    displayOperation(e);
  }
};

// DETERMINE OPERATOR EVENT
operationBttn.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.innerText === "") {
      undoValues();
    } else {
      arithmaticValue(e);
    }
  });
});

// DETERMINE operand1 & operand2 VALUE
numberBttn.forEach((e) => {
  e.addEventListener("click", () => {
    operandValue(e);
  });
});
