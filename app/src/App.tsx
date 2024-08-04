import React, { useState } from 'react';
import "./App.css";

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('');

  const handleNum1Change = (e) => {
    setNum1(e.target.value);
  };

  const handleNum2Change = (e) => {
    setNum2(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  const calculate = () => {
    let result;
    switch (operator) {
      case '+':
        result = parseFloat(num1) + parseFloat(num2);
        break;
      case '-':
        result = parseFloat(num1) - parseFloat(num2);
        break;
      case '*':
        result = parseFloat(num1) * parseFloat(num2);
        break;
      case '/':
        result = parseFloat(num1) / parseFloat(num2);
        break;
      default:
        result = '';
    }
    setResult(result.toString());
  };

  return (
    <div className="container">
      <h1>Calculator</h1>
      <input type="number" value={num1} onChange={handleNum1Change} />
      <select value={operator} onChange={handleOperatorChange}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" value={num2} onChange={handleNum2Change} />
      <button onClick={calculate}>=</button>
      <p>Result: {result}</p>

      <p className="footer">
        <code>
          Built with ❤️ by{" "}
          <a href="https://www.linkedin.com/in/jcarce/" target="_blank">
            Carlos
          </a>{" "}
          |{" "}
          <a href="https://github.com/arcxda/ecs-ecr-lb-tf-gha" target="_blank">
            Github
          </a>{" "}
          |{" "}
        </code>
      </p>
    </div>
  );
}

export default App;