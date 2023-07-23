function saveNumbers() {
  let index;
  index = !nums[0] ? 0 : 1;
  nums[index] = Number.parseFloat(display.innerText);
  console.log("Number 1 : " + index[0]);
  console.log("Number 2 : " + index[1]);
}

function removeNumbers() {
  nums = [];
}

function clearDisplay() {
  display.innerText = "0";
}

function blankDisplay() {
  display.innerText = "";
}

function doUnaryOperation(op) {
  switch (op) {
    case "pos-neg":
      display.innerText = -display.innerText;
      break;
    case "sqrt":
      display.innerText = Math.sqrt(display.innerText);
      break;
  }
}

function butifyNumbers() {
  display.innerText = Number.parseFloat(display.innerText);
}

function doBinaryOperation(op) {}

function removeFromDisplay() {
  if (display.innerText.length === 1) clearDisplay();
  else display.innerText = display.innerText.slice(0, -1);
}

function appendToDisplay(char) {
  if (display.innerText === "NaN") clearDisplay();
  if (char === ".") {
    if (display.innerText.includes(".")) return;
  } else {
    if (display.innerText === "0") blankDisplay();
  }
  display.innerText += char;
}

function getKeyContent(e) {
  switch (e.target.id) {
    case "clear-display":
      clearDisplay();
      break;
    case "reset-calc":
      clearDisplay();
      //   and remove any saved memory and previous calcs
      break;
    case "backspace":
      removeFromDisplay();
      break;
    case "divide":
    case "multiply":
    case "plus":
    case "minus":
    case "pow":
    case "modulo":
      butifyNumbers();
      doBinaryOperation(e.target.id);
      break;
    case "sqrt":
    case "pos-neg":
    case "equals":
      butifyNumbers();
      doUnaryOperation(e.target.id);
      break;
    default: // for all the numbers and dot
      if ("0123456789.".includes(e.target.innerText)) {
        appendToDisplay(e.target.innerText);
      }
  }
}

let nums = [];

document.querySelector("#copyright-year").innerText = new Date().getFullYear();
const display = document.querySelector(".calc-display");
document
  .querySelectorAll("button")
  .forEach((btn) => btn.addEventListener("click", getKeyContent));
