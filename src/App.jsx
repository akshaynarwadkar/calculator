import { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [input, setInput] = useState("");
  const [result1, setResult1] = useState("");
  const [error, setError] = useState("");

  function calculateResult() {
    if (input.match(/[+\-*/%]{2,}/)) {
      // Check for consecutive operator symbols
      setError("Invalid input: Consecutive operators");
      setInput("");
      setResult1("");
      return;
    }
    const operators = ["%", "-", "+", "*", "/"];
    let operator = null;

    for (let i = 0; i < input.length; i++) {
      if (operators.includes(input[i])) {
        operator = input[i];
        break;
      }
    }

    const [operand1, operand2] = input.split(operator).map(parseFloat);

    if (
      (operand1 && operator && !operand2) ||
      (!operand1 && operator && operand2) ||
      !operand1
    ) {
      setError("Invalid input");
      setInput("");
      setResult1("");
      return;
    }

    if (operand1 && !operand2) {
      setResult1(input);
      return;
    }

    let result = "";

    switch (operator) {
      case "+":
        result = operand1 + operand2;
        break;
      case "-":
        result = operand1 - operand2;
        break;
      case "*":
        result = operand1 * operand2;
        break;
      case "%":
        result = operand1 % operand2;
        break;
      case "/":
        result = operand1 / operand2;
        break;
      default:
        throw new Error();
    }

    setResult1(result.toString());
    setInput("");
  }

  const clear = () => {
    setResult1("");
    setError("");
    setInput("");
  };

  const backSpace = () => {
    console.log("start");
    if (result1) {
      console.log("result");
      setResult1((prevResult) => prevResult.slice(0, -1));
    } else if (input) {
      console.log("input");
      setInput((prevInput) => prevInput.slice(0, -1));
    }
  };

  const inputHandler = (value) => {
    if (value === "=") {
      calculateResult();
    } else {
      setResult1(false);
      setInput((prevValue) => prevValue + value);
    }
  };

  return (
    <div className="container">
      <div>
        <h1>{result1 || input || error}</h1>
      </div>
      <div>
        <button onClick={clear}>C</button>
        <button onClick={backSpace}>&lt;</button>
        <button onClick={() => inputHandler("%")}>%</button>
        <button onClick={() => inputHandler("/")}>/</button>
      </div>
      <div>
        <button onClick={() => inputHandler("7")}>7</button>
        <button onClick={() => inputHandler("8")}>8</button>
        <button onClick={() => inputHandler("9")}>9</button>
        <button onClick={() => inputHandler("*")}>*</button>
      </div>
      <div>
        <button onClick={() => inputHandler("4")}>4</button>
        <button onClick={() => inputHandler("5")}>5</button>
        <button onClick={() => inputHandler("6")}>6</button>
        <button onClick={() => inputHandler("-")}>-</button>
      </div>
      <div>
        <button onClick={() => inputHandler("1")}>1</button>
        <button onClick={() => inputHandler("2")}>2</button>
        <button onClick={() => inputHandler("3")}>3</button>
        <button onClick={() => inputHandler("+")}>+</button>
      </div>
      <div>
        <button onClick={() => inputHandler("0")}>0</button>
        <button onClick={() => inputHandler("00")}>00</button>
        <button onClick={() => inputHandler(".")}>.</button>
        <button onClick={() => inputHandler("=")}>=</button>
      </div>
    </div>
  );
};
export default App;
