let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = '';
let waitingForNewInput = false;
let memory = 0;

function updateDisplay() {
  display.textContent = currentInput;
  updateMemoryButtons();
}

function updateMemoryButtons() {
  const mc = document.getElementById('mc');
  const mr = document.getElementById('mr');

  if (memory !== 0) {
    mc.disabled = false;
    mr.disabled = false;
  } else {
    mc.disabled = true;
    mr.disabled = true;
  }
}

function inputNumber(num) {
  if (waitingForNewInput || currentInput === '0') {
    currentInput = num;
    waitingForNewInput = false;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function inputDecimal() {
  if (waitingForNewInput) {
    currentInput = '0.';
    waitingForNewInput = false;
  } else if (currentInput.indexOf('.') === -1) {
    currentInput += '.';
  }
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  waitingForNewInput = false;
  updateDisplay();
}

function clearEntry() {
  currentInput = '0';
  updateDisplay();
}

function backspace() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
}

function add() {
  setOperator('+');
}

function subtract() {
  setOperator('-');
}

function multiply() {
  setOperator('*');
}

function divide() {
  setOperator('/');
}

function setOperator(op) {
  if (operator !== '' && !waitingForNewInput) {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  waitingForNewInput = true;
}

function calculate() {
  if (operator === '' || waitingForNewInput) return;

  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        currentInput = 'Cannot divide by zero';
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = '';
  previousInput = '';
  waitingForNewInput = true;
  updateDisplay();
}

function percentage() {
  let current = parseFloat(currentInput);
  currentInput = (current / 100).toString();
  updateDisplay();
}

function square() {
  let current = parseFloat(currentInput);
  currentInput = (current * current).toString();
  updateDisplay();
}

function squareRoot() {
  let current = parseFloat(currentInput);
  if (current < 0) {
    currentInput = 'Invalid input';
    updateDisplay();
    return;
  }
  currentInput = Math.sqrt(current).toString();
  updateDisplay();
}

function fraction() {
  let current = parseFloat(currentInput);
  if (current === 0) {
    currentInput = 'Cannot divide by zero';
    updateDisplay();
    return;
  }
  currentInput = (1 / current).toString();
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '0') {
    if (currentInput.startsWith('-')) {
      currentInput = currentInput.substring(1);
    } else {
      currentInput = '-' + currentInput;
    }
    updateDisplay();
  }
}


document.getElementById('mc').onclick = function () {
  memory = 0;
  updateDisplay();
};

document.getElementById('mr').onclick = function () {
  currentInput = memory.toString();
  waitingForNewInput = true;
  updateDisplay();
};

document.getElementById('mplus').onclick = function () {
  memory += parseFloat(currentInput);
  updateDisplay();
};

document.getElementById('mminus').onclick = function () {
  memory -= parseFloat(currentInput);
  updateDisplay();
};

document.getElementById('ms').onclick = function () {
  memory = parseFloat(currentInput);
  updateDisplay();
};


document.addEventListener('keydown', function (event) {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    inputNumber(key);
  } else if (key === '.') {
    inputDecimal();
  } else if (key === '+') {
    add();
  } else if (key === '-') {
    subtract();
  } else if (key === '*') {
    multiply();
  } else if (key === '/') {
    event.preventDefault();
    divide();
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Escape') {
    clearAll();
  } else if (key === 'Backspace') {
    backspace();
  }
});

updateDisplay();