export default class Calculator {
  constructor(
    primaryOperandDisplay,
    secondaryOperandDisplay,
    operationDisplay
  ) {
    this.#primaryOperandDisplay = primaryOperandDisplay;
    this.#secondaryOperandDisplay = secondaryOperandDisplay;
    this.#operationDisplay = operationDisplay;

    this.clear();
  }

  #primaryOperanDiplay;
  #secondaryOperandDisplay;
  #operandDisplay;

  get primaryOperand() {
    return parseFloat(this.#primaryOperanDiplay.dataset.value);
  }

  set primaryOperand(value) {
    this.#primaryOperanDiplay.dataset.value = value ?? "";
    this.#primaryOperanDiplay.textContent = displayNumber(value);
  }

  get secondaryOperand() {
    return parseFloat(this.#secondaryOperandDisplay.dataset.value);
  }

  set secondaryOperand(value) {
    this.#secondaryOperandDisplay.dataset.value = value ?? "";
    this.#secondaryOperandDisplay.textContent = displayNumber(value);
  }

  get operation() {
    return this.#operandDisplay.textContent;
  }

  set operation(value) {
    this.#operandDisplay.textContent = value ?? "";
  }

  addDigit(digit) {
    if (
      digit === "." &&
      this.#primaryOperanDiplay.dataset.value.includes(".")
    ) {
      return;
    }

    this.primaryOperand = this.#primaryOperanDiplay.dataset.value + digit;
  }

  removeDigit() {
    const numberString = this.#primaryOperanDiplay.dataset.value;
    if (numberString.length <= 1) {
      this.primaryOperand = 0;
      return;
    }

    this.primaryOperand = numberString.substring(0, numberString.length - 1);
  }

  evaluate() {
    let result;

    switch (this.operation) {
      case "*":
        result = this.secondaryOperand * this.primaryOperand;
        break;
      case "÷":
        result = this.secondaryOperand / this.primaryOperand;
        break;
      case "+":
        result = this.secondaryOperand + this.primaryOperand;
        break;
      case "-":
        result = this.secondaryOperand - this.primaryOperand;
        break;
      default:
        return;
    }
    this.clear();

    this.primaryOperand = result;

    return result;
  }



}