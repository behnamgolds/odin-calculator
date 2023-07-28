// ! if display value is NaN (as a result of sqrt(-1)) pressing a digit changes the display value
// ! to 0 , but then pressing a binary operator (e.g *) and a number (e.g 3) will not do the calculation
// ! and still shows that digit (instead of 0 in this case).

let numbers = [];
let operator = [];
let allowEdit = true;
const unaryOperators = ["negate", "sqrt"];
const legalDisplayMaterial = "0123456789.";
const calculator = {
  divide(num1, num2) {
    return num1 / num2;
  },
  multiply(num1, num2) {
    return num1 * num2;
  },
  add(num1, num2) {
    return num1 + num2;
  },
  subtract(num1, num2) {
    return num1 - num2;
  },
  pow(num1, num2) {
    return num1 ** num2;
  },
  modulo(num1, num2) {
    return num1 % num2;
  },
  negate(num1) {
    return Number.parseFloat(-num1);
  },
  sqrt(num1) {
    return Math.sqrt(num1);
  },
};

function pushNum(num) {
  numbers.push(num);
  updateDisplay();
  if (isDisplayError()) popNum();
}
function popNum() {
  return numbers.pop();
}
function pushOperator(op) {
  operator.push(op);
}
function popOperator(op) {
  return operator.pop();
}
function getDisplayContent() {
  return Number.parseFloat(display.innerText);
}
function updateDisplay(result) {
  console.log(result);
  if (typeof result != "undefined") display.innerText = result;
  else display.innerText = numbers[numbers.length - 1];
}
function clearDisplay() {
  display.innerText = "0";
  // numbers = [];
  // operator = [];
}
function blankDisplay() {
  display.innerText = "";
}
function backSpace(e) {
  if (!isDisplayError()) {
    if (display.innerText.length === 1 || !allowEdit) clearDisplay();
    else {
      display.innerText = display.innerText.slice(0, -1);
      if (display.innerText === "-") clearDisplay();
    }
  }
}
function resetCalc() {
  clearDisplay();
  numbers = [];
  operator = [];
  //   and remove any saved memory and previous calcs
}
function beautifyDisplayNum() {
  display.innerText = Number.parseFloat(display.innerText);
}
function appendDisplay(char) {
  if (isDisplayError()) clearDisplay();
  if (char === ".") {
    if (display.innerText.includes(".")) return;
  } else {
    if (display.innerText === "0") blankDisplay();
  }
  display.innerText += char;
}

function isUnaryOperator(op) {
  return unaryOperators.includes(op);
}

function calculateUnary(e) {
  if (!isDisplayError()) {
    updateDisplay(calculator[e.target.id](getDisplayContent()));
  }
}

function calculateBinary() {
  if (numbers.length === 2 && operator.length === 1) {
    let op = popOperator();
    let result;
    let num2 = popNum();
    let num1 = popNum();
    console.log(num1 + " --- " + num2);
    result = calculator[op](num1, num2);
    allowEdit = false;
    updateDisplay(result);
    console.log(numbers);
  }
}

function isDisplayMaterial(item) {
  return legalDisplayMaterial.includes(item);
}

function isDisplayError() {
  return display.innerText === "NaN" || display.innerText === "Infinity";
}

function getDigit(e) {
  if (!allowEdit) {
    clearDisplay();
    allowEdit = true;
  }
  appendDisplay(e.target.innerText);
}

function equals(e) {
  if (operator.length > 0) {
    allowEdit = false;
    pushNum(getDisplayContent());
    calculateBinary();
  }
}

function getBinaryOperator(e) {
  if (!isDisplayError()) {
    pushNum(getDisplayContent());
    if (operator.length > 0) calculateBinary(); // change #1
    pushOperator(e.target.id);
    allowEdit = false;
  } else clearDisplay();
}

document.querySelector("#copyright-year").innerText = new Date().getFullYear();
const display = document.querySelector(".calc-display");
document
  .querySelectorAll(".binary-operator")
  .forEach((btn) => btn.addEventListener("click", getBinaryOperator));

document
  .querySelectorAll(".unary-operator")
  .forEach((btn) => btn.addEventListener("click", calculateUnary));

document
  .querySelectorAll(".digit")
  .forEach((btn) => btn.addEventListener("click", getDigit));

document.querySelector("#backSpace").addEventListener("click", backSpace);
document.querySelector("#clearDisplay").addEventListener("click", clearDisplay);
document.querySelector("#resetCalc").addEventListener("click", resetCalc);
document.querySelector("#equals").addEventListener("click", equals);
