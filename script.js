//SELECT ELEMENTS
const input_element = document.querySelector(".input");
const output_operation_element = document.querySelector(".operation .value");
const output_result_element = document.querySelector(".result .value");
const history_element = document.querySelector(".history .value");

//SOME VARIABLES
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(",
  FACTORIAL = "FACTORIAL";

let data = {
  operation: [],
  formula: [],
};

let ANS = 0;

let history = [];
let ansHistory = [];
// CALCULATOR BUTTONS
let calculator_buttons = [
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math_function",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function",
  },
  {
    name: "power",
    symbol: "x<span>y</span>",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigo_function",
  },
  {
    name: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigo_function",
  },
  {
    name: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigo_function",
  },

  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
  },

  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math_function",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "factorial",
    symbol: "×!",
    formula: FACTORIAL,
    type: "math_function",
  },

  {
    name: "rad",
    symbol: "Rad",
    formula: false,
    type: "key",
  },
  {
    name: "deg",
    symbol: "Deg",
    formula: false,
    type: "key",
  },

  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },

  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },

  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },

  {
    name: "seven",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "eight",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "nine",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },

  {
    name: "four",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "five",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "six",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },

  {
    name: "one",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "two",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "three",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "zero",
    symbol: 0,
    formula: 0,
    type: "number",
  },

  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
  {
    name: "history",
    symbol: "H",
    formula: "H",
    type: "history",
  },
];

function createCalculatorButtons() {
  const bnts_per_row = 4;
  let added_bnts = 0;

  calculator_buttons.forEach((button) => {
    if (added_bnts % bnts_per_row == 0) {
      input_element.innerHTML += `<div class="row"></div>`;
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}">
                            ${button.symbol}
                            </button>`;

    added_bnts++;
  });
}
createCalculatorButtons();

let RADIAN = true;

const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

rad_btn.classList.add("active-angle");

function angleToggler() {
  rad_btn.classList.toggle("active-angle");
  deg_btn.classList.toggle("active-angle");
}

// CLICK EVENT LISTENER
input_element.addEventListener("click", (event) => {
  const target_btn = event.target;
  calculator_buttons.forEach((button) => {
    if (button.name == target_btn.id) calculator(button);
  });
});
history_element.addEventListener("click", function () {
  var box = docu.getElementById("history");
  if (box.style.display == "none") {
    box.style.display == "block";
  } else {
    box.style.display == "none";
  }
});
// calculator
function calculator(button) {
  if (button.type == "operator") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "trigo_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
  } else if (button.type == "math_function") {
    let symbol, formula;

    if (button.name == "factorial") {
      symbol = "!";
      formula = button.formula;
      // console.log(formula)
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "power") {
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "square") {
      symbol = "^(2";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);

      data.formula.push("2");
    } else {
      symbol = button.symbol + "(";
      formula = button.formula + "(";

      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];

      updateOutputResult(0);
    } else if (button.name == "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name == "rad") {
      RADIAN = true;
      angleToggler();
    } else if (button.name == "deg") {
      RADIAN = false;
      angleToggler();
    }
  } else if (button.type == "calculate") {
    formula_str = data.formula.join("");

    let POWER_SEARCH_RESULT = search(data.formula, POWER);
    //console.log(POWER_SEARCH_RESULT)
    const POWER_BASE = powerGetter(data.formula, POWER_SEARCH_RESULT);
    // console.log(POWER_BASE);
    POWER_BASE.forEach((base) => {
      let toReplace = base + POWER;
      let replacement = "Math.pow(" + base + ",";
      formula_str = formula_str.replace(toReplace, replacement);
    });
    console.log(formula_str);
    let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);

    const FACTORIAL_BASE = factorialGetter(
      data.formula,
      FACTORIAL_SEARCH_RESULT
    );
    //console.log(FACTORIAL_BASE);
    FACTORIAL_BASE.forEach((base) => {
      formula_str = formula_str.replace(base.toReplace, base.replacement);
    });
    let result;
    try {
      result = eval(formula_str);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "SyntaxError!!";
        updateOutputResult(result);
        return;
      }
    }

    ans = result;
    history.push({ expression: data.operation.join(""), result: ans });

    //console.log(history);
    data.operation = [];
    data.formula = [];
    // console.log(formula_str) / console.log(result);
    updateOutputResult(result);
  }

  updateOutputOperation(data.operation.join(""));

  updateHistory(history);
}
console.log(data.operation);
console.log(data.formula);

function updateOutputOperation(operation) {
  output_operation_element.innerHTML = operation;
}
function updateOutputResult(result) {
  output_result_element.innerHTML = result;
}
function updateHistory(history, ansHistory) {
  var str = "";
  for (var key in history) {
    str +=
      "" + history[key]["expression"] + "=" + history[key]["result"] + "<br>";
  }
  history_element.innerHTML = str;
}

function trigo(callback, angle) {
  if (!RADIAN) {
    angle = (angle * Math.PI) / 180;
  }
  return callback(angle);
}
function inv_trigo(callback, value) {
  let angle = callback(value);

  if (!RADIAN) {
    angle = (angle * 180) / Math.PI;
  }

  return angle;
}
function factorial(number) {
  if (number % 1 != 0) return gamma(number + 1);
  if (number === 0 || number === 1) return 1;

  let result = 1;
  for (let i = 1; i <= number; i++) {
    result *= i;
    if (result === Infinity) return Infinity;
  }
  return result;
}
// GAMMA FUNCTINON
function gamma(n) {
  // accurate to about 15 decimal places
  //some magic constants
  var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
    p = [
      0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7,
    ];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
}

// SEARCH AN ARRAY INDEX
function search(array, keyword) {
  let search_result = [];
  array.forEach(myFunction);
  function myFunction(item, index) {
    if (item == keyword) search_result.push(index);
  }
  return search_result;
}

function powerGetter(formula, POWER_SEARCH_RESULT) {
  let power_base = [];

  POWER_SEARCH_RESULT.forEach((power_index) => {
    let base = [];

    let paranthisis = 0;

    for (
      let previous_index = power_index - 1;
      previous_index >= 0;
      previous_index--
    ) {
      if (formula[previous_index] == "(") paranthisis--;
      if (formula[previous_index] == ")") paranthisis++;

      let isOPERATOR = false;
      OPERATORS.forEach((OPERATOR) => {
        if (formula[previous_index] == OPERATOR) isOPERATOR = true;
      });

      if (paranthisis == 0 && isOPERATOR && formula[previous_index] != POWER)
        break;
      if (paranthisis != 0 && formula[previous_index] == POWER) {
        base.unshift("(");

        break;
      }
      base.unshift(formula[previous_index]);
      console.log(base);
    }
    power_base.push(base.join(""));
  });
  console.log(power_base);
  return power_base;
}

function factorialGetter(formula, FACTORIAL_SEARCH_RESULT) {
  let number_base = [];

  let factorial_seq = 0;

  FACTORIAL_SEARCH_RESULT.forEach((factorial_index) => {
    let base = [];

    let paranthisis = 0;
    let next_index = factorial_index + 1;
    let next_input = formula[next_index];

    if (next_input == FACTORIAL) {
      factorial_seq += 1;
      return;
    }
    let first_factorial_index = factorial_index - factorial_seq;
    for (
      let previous_index = first_factorial_index - 1;
      previous_index >= 0;
      previous_index--
    ) {
      if (formula[previous_index] == "(") paranthisis--;
      if (formula[previous_index] == ")") paranthisis++;

      let isOPERATOR = false;
      OPERATORS.forEach((OPERATOR) => {
        if (formula[previous_index] == OPERATOR) isOPERATOR = true;
      });

      if (paranthisis == 0 && isOPERATOR) break;
      base.unshift(formula[previous_index]);
    }
    let number_str = base.join("");
    const factorial = "factorial(",
      close_paranthesis = ")";
    let times = factorial_seq + 1;

    let toReplace = number_str + FACTORIAL.repeat(times);
    let replacement = factorial.repeat(times) + number_str + close_paranthesis;

    number_base.push({
      toReplace: toReplace,
      replacement: replacement,
    });

    factorial_seq = 0;
  });
  return number_base;
}
document.getElementById("history").addEventListener("click", function () {
  var box = document.getElementById("right");
  if (box.style.display == "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
});
