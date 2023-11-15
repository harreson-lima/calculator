const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#btn-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Add a digit to calculator screen
  addDigit(digit) {
    //check if calculator screen is empty before add a dot
    if (digit === "." && this.currentOperation === "") {
      return;
    }
    //check if alredy has a dot in the screen
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  //process all the operations
  processOperation(operation) {
    //get current and previus values
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    const previus = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    const previousOperation = this.previousOperationText.innerText.split(" ")[1];

    switch (operation) {
      case "+":
        operationValue = previus + current;
        this.updateScreen(operationValue, operation, previus, current);
        break;
      case "−":
        operationValue = previus - current;
        this.updateScreen(operationValue, operation, previus, current);
        break;
      case "×":
        operationValue = previus * current;
        this.updateScreen(operationValue, operation, previus, current);
        break;
      case "÷":
        operationValue = previus / current;
        this.updateScreen(operationValue, operation, previus, current);
        break;
      case "DEL":
        this.processDelOperation();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearAllOperation();
        break;
      case "=":
        this.processEqualOperation();
        break;
      default:
        break;
    }
  }

  //change the value of calculator screen
  updateScreen(
    operationValue = null, 
    operation = null, 
    previus = null, 
    current = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previus === 0) {
        operationValue = current;
      }

      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = ""; 
    }  

  }

  changeOperation(operation) {
    const mathOperations = ["+", "−", "×", "÷"];
    
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText = 
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  processDelOperation() {
    this.currentOperationText.innerText = 
      this.currentOperationText.innerText.slice(0, -1);
  }

  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  processClearAllOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  processEqualOperation() {
    const operation = this.previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
