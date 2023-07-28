// ! if display value is NaN (as a result of sqrt(-1)) pressing a digit changes the display value
// ! to 0 , but then pressing a binary operator (e.g *) and a number (e.g 3) will not do the calculation
// ! and still shows that digit (instead of 0 in this case).

// fixed: can not calculate three consquetive calculations (without using = between them). could be the same
//  as the previous bug?
//  it seems that we lose the first binary operation's result when clicking the second binary operator.
//  after one calculation and second input of a operator and at the third input of a number the getDigit
//  function clears the screen, so the previous result is lost.

let numbers = [];
let operator = [];
let allowEdit = true;
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

function pushNum() {
  numbers.push(getDisplayContent());
  // updateDisplay();
  if (isDisplayError()) popNum();
}

function popNum() {
  return numbers.pop();
}

function pushOperator(op) {
  operator.pop();
  operator.push(op);
}

function popOperator() {
  return operator.pop();
}

function getDisplayContent() {
  return Number.parseFloat(display.innerText);
}

function updateDisplay(result) {
  if (typeof result != "undefined") display.innerText = result;
  else display.innerText = numbers[numbers.length - 1];
}

function clearDisplay() {
  display.innerText = "0";
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
  allowEdit = true;
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

function calculateUnary(e) {
  if (!isDisplayError()) {
    updateDisplay(calculator[e.target.id](getDisplayContent()));
  }
}

function calculateBinary() {
  if (numbers.length >= 2 && operator.length === 1) {
    let op = popOperator();
    let result;
    let num2 = popNum();
    let num1 = popNum();
    result = calculator[op](num1, num2);
    allowEdit = false;
    updateDisplay(result);
    popNum(); // in case we have an unwanted number from previous result and no operator left.
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
    // when there was a previous calculation, the allowEdit is set to false
    if (!isDisplayError()) pushNum();
    clearDisplay();
    allowEdit = true;
  }
  if (e.type === "keydown") appendDisplay(e.key);
  else appendDisplay(e.target.innerText);
}

function equals(e) {
  if (operator.length === 1) {
    allowEdit = false;
    pushNum();
    calculateBinary();
  }
}

function getBinaryOperator(e) {
  if (!isDisplayError()) {
    pushNum();
    if (operator.length > 0) calculateBinary();
    pushOperator(e.target.id);
    allowEdit = false;
  } else clearDisplay();
}

function getKey(e) {
  console.log(e);
  e.preventDefault();
  if (isDisplayMaterial(e.key)) {
    getDigit(e);
  } else {
    switch (e.key) {
      case "Enter":
        equals(e);
        break;
      case "Backspace":
        backSpace(e);
        break;
      case "/":
        divideBtn.click();
        break;
      case "*":
        multiplyBtn.click();
        break;
      case "+":
        addBtn.click();
        break;
      case "-":
        subtractBtn.click();
        break;
      case "^":
        powBtn.click();
        break;
      case "%":
        moduloBtn.click();
        break;
      case "r":
      case "R":
        sqrtBtn.click();
        break;
      case "n":
      case "N":
        negateBtn.click();
        break;
      case "c":
      case "C":
        clearDisplay();
        break;
      case "a":
      case "A":
        clearDisplay();
        break;
    }
  }
}

document.querySelector("#copyright-year").innerText = new Date().getFullYear();
const display = document.querySelector(".calc-display");
const divideBtn = document.querySelector("#divide");
const multiplyBtn = document.querySelector("#multiply");
const subtractBtn = document.querySelector("#subtract");
const addBtn = document.querySelector("#add");
const powBtn = document.querySelector("#pow");
const moduloBtn = document.querySelector("#modulo");
const sqrtBtn = document.querySelector("#sqrt");
const negateBtn = document.querySelector("#negate");
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

document.addEventListener("keydown", getKey);
