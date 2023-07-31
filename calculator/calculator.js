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
  #operandDisplay

  get primaryOperand() {
    return parseFloat(this.#primaryOperanDiplay.dataset.value);
  }

  set primaryOperand(value) {
    this.#primaryOperanDiplay.dataset.value = value ?? ""
    this.#primaryOperanDiplay.textContent = displayNumber(value);
  }

  get secondaryOperand() {
    return parseFloat(this.#primaryOperanDiplay.dataset.value);
  }

  set secondaryOperand(value) {
    this.#primaryOperanDiplay.dataset.value = value ?? "";
    this.#primaryOperanDiplay.textContent = displayNumber(value);
  }

  get operation() {
    return this.#operandDisplay.textContent
  }

  set operation(value) {
    this.#operandDisplay.textContent = value ?? ""
  }

  addDigit(digit) {
    if (
        digit === "." && this.#primaryOperanDiplay.dataset.value.includes(".")
    ) {
        return
    }
  }
}