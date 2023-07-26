let numbers = [];
let operator = [];
const unaryOperators = ["negate", "sqrt"];
const legalDisplayMaterial = "0123456789.";
const calculator = {
  divide(num1, num2) {
    return num1 / num2;
  },
  multiply(num1, num2) {
    return num1 * num2;
  },
  plus(num1, num2) {
    return num1 + num2;
  },
  minus(num1, num2) {
    return num1 - num2;
  },
  pow(num1, num2) {
    return num1 ** num2;
  },
  modulo(num1, num2) {
    return num1 % num2;
  },
  negate(num1) {
    return -num1;
  },
  sqrt(num1) {
    return Math.sqrt(num1);
  },
};

function equals() {
  calculate();
}
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
  if (result) display.innerText = result;
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
function backSpace() {
  if (display.innerText.length === 1) clearDisplay();
  else display.innerText = display.innerText.slice(0, -1);
  if (display.innerText === "-") clearDisplay();
}
function resetCalc() {
  clearDisplay();
  numbers = [];
  operator = [];
  //   and remove any saved memory and previous calcs
}
function butifyDisplayNum() {
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

function calculate() {
  console.log(numbers);
  if (numbers.length > 0 && operator.length > 0) {
    let op = popOperator();
    let result;
    let num2 = popNum();
    if (isUnaryOperator(op)) {
      result = calculator[op](num2);
    } else if (numbers.length > 0) {
      let num1 = popNum();
      console.log(num1 + " --- " + num2);
      result = calculator[op](num1, num2);
    } else {
      result = num2;
      pushNum(result);
      pushOperator(op);
    }
    // pushNum(result);
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

function getKey(e) {
  if (isDisplayMaterial(e.target.innerText)) {
    // This does not push 0 if the first input key is an operator!
    // like when you want to calculate 0 + 5 but you wont press 0 first because the
    // display already contains 0, so you first press + and then 5.
    if (operator.length > 0) {
      clearDisplay();
    }
    appendDisplay(e.target.innerText);
    return;
  }

  switch (e.target.id) {
    case "equals":
      if (operator.length > 0) {
        pushNum(getDisplayContent());
        // calculate();
      }
      break;
    case "backSpace":
      backSpace();
      break;
    case "clearDisplay":
      clearDisplay();
      break;
    case "resetCalc":
      resetCalc();
      break;
    default:
      if (!isDisplayError()) {
        pushNum(getDisplayContent());
        pushOperator(e.target.id);
      } else clearDisplay();
  }

  calculate();
  // if key is equals call calculate
  // call calculate everytime anything other than numbers or dot got clicked
}

document.querySelector("#copyright-year").innerText = new Date().getFullYear();
const display = document.querySelector(".calc-display");
document
  .querySelectorAll("button")
  .forEach((btn) => btn.addEventListener("click", getKey));
