"use strict";

class Calculator {
  constructor(prevExpText, crrExpText) {
    this.prevExpText = prevExpText;
    this.crrExpText = crrExpText;
    this.clear();
  }

  clear() {
    this.prevExp = "";
    this.crrExp = "";
    this.operation = null;
  }

  delete() {
    this.crrExp = this.crrExp.slice(0, this.crrExp.length - 1);
  }

  appendNumber(number) {
    if (number === "." && this.crrExp.includes(".")) {
      return;
    }
    this.crrExp = this.crrExp.toString() + number.toString();
  }

  appendOp(op) {
    if (this.crrExp === "") {
      return;
    }
    if (this.prevExp !== "") this.compute();
    this.operation = op;
    this.prevExp = this.crrExp;
    this.crrExp = "";
    this.prevExp = this.prevExp.toString() + " " + op.toString();
  }

  compute() {
    const prev = parseFloat(this.prevExp);
    const crr = parseFloat(this.crrExp);

    if (this.prevExp === "" || this.crrExp === "") {
      return;
    }

    switch (this.operation) {
      case "+":
        this.crrExp = (prev + crr).toString();
        break;
      case "-":
        this.crrExp = (prev - crr).toString();
        break;
      case "x":
        this.crrExp = (prev * crr).toString();
        break;
      case "÷":
        this.crrExp = (prev / crr).toString();
        break;
      default:
        crrExp = "Invalid operation";
    }
    this.prevExp = "";
    this.operation = null;
  }

  getNumber(number) {
    if (!number.includes(".")) return number;
    const strNum = number.toString();

    const integerPart = parseFloat(strNum.split(".")[0]);
    const decimalPart = strNum.split(".")[1];

    let integerDisplay = "";

    if (!isNaN(integerPart)) {
      integerDisplay = integerPart.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalPart != null) return `${integerDisplay}.${decimalPart}`;
    else return "";
  }

  updateDisplay() {
    this.crrExpText.innerText = this.getNumber(this.crrExp);
    this.prevExpText.innerText = this.getNumber(this.prevExp);
  }
}

const numberButtons = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const prev = document.querySelector(".prev-exp");
const crr = document.querySelector(".crr-exp");

const calculator = new Calculator(prev, crr);

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.appendNumber(button.value);
    calculator.updateDisplay();
  });
});

operations.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.appendOp(button.value);
    calculator.updateDisplay();
  });
});

equals.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
});

clear.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});

del.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});

const heading = document.querySelectorAll(".head");
console.log(heading);

function generateRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

heading.forEach(function (head) {
  head.addEventListener("mouseover", function () {
    head.style.color = `${generateRandomColor()}`;
    setTimeout(function () {
      head.style.color = "#f0f8ff";
    }, 500);
  });
});

//!Hiding and showing info box
const infoButton = document.querySelector(".info-icon");
const infoBox = document.querySelector(".info-box");

let flag = 0;
let opacity = 0;

infoButton.addEventListener("click", function () {
  const interval = setInterval(text, 100);
  function text() {
    if (flag == 0) {
      infoBox.style.opacity = opacity;
      opacity += 0.1;
      if (opacity == 1) {
        flag = 1;
        clearInterval(interval);
      }
    } else {
      infoBox.style.opacity = opacity;
      opacity -= 0.1;
      if (opacity == 0) {
        flag = 0;
        clearInterval(interval);
      }
    }
  }
});
