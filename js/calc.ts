var operator: string = "";
var last_key: string = "";
var result: number = NaN;
var changeDisplay: boolean = true;

const ERROR_MESSAGE: string = "ERR";
const DECIMAL_PLACES: number = 3;
const MAXIMO_DIGITS: number = 8;

const NUMBERS: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATORS: Array<string> = ["-", "+", "/", "*"];
const ENTER_KEY: number = 13;
const BACKSPACE_KEY: number = 8;


//------------------------------ Events
window.addEventListener("keydown", function (event) {
    console.log("key code: " + event.keyCode + ", key char: " + event.key);
    if (isOperator(event.key)) {
        clickOperador(event.key);
    } else if (isNumber(event.key)) {
        clickNumberButton(event.key);
    } else if (event.key == ".") {
        clickDot();
    } else if (event.keyCode == ENTER_KEY) {
        clickEquals();
    } else if (event.keyCode == BACKSPACE_KEY) {
        clickLeftArrow();
    }
});

// load and reload page
window.addEventListener("load", function (event) {
    let display: HTMLElement | null = document.getElementById("display");
    if (display == null) {
        return;
    }
    display.innerHTML = "0";
});

//-----------------------------------------------------
function isNumber(text: string): boolean {
    if (NUMBERS.indexOf(text) != -1) {
        return true;
    } else {
        return false;
    }
}
//
function isOperator(text: string): boolean {
    if (OPERATORS.indexOf(text) != -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * Inverter sinal do número
 */
function clickInvert() {
    let display: Element | null = document.getElementById("display");
    if (display == null) {
        console.log("Click_invert display null");
        return;
    }
    if (display.innerHTML == ERROR_MESSAGE) {
        return;
    }
    let result_invert: number = (-1) * parseFloat(numberFormatToNumber(display.innerHTML));
    display.innerHTML = numberToNumberFormat(String(result_invert));

}


function clickLeftArrow() {
    let display: HTMLElement | null = document.getElementById("display");
    if (display == null) {
        return;
    }
    // tela com número zero
    if (display.innerHTML == "0" || display.innerHTML == ERROR_MESSAGE) {
        return;
    }
    display.innerHTML = numberFormatToNumber(display.innerHTML);
    let new_value: string = display.innerHTML.substr(0, display.innerHTML.length - 1);
    if (new_value == "") {
        display.innerHTML = "0";
    } else {
        //console.log("leftRow: new value> "+new_value);
        if (new_value == "-") {
            display.innerHTML = "0";
            return;
        }
        display.innerHTML = numberToNumberFormat(new_value);
    }

}
//
function clickOperador(new_operator: string) {
    let display: HTMLElement | null = document.getElementById("display");
    if (display == null) {
        return;
    }
    // caso ERR, bloqueia insersão
    if (display.innerHTML == ERROR_MESSAGE) {
        return;
    }
    if (isOperator(last_key)) {
        operator = new_operator;
        last_key = new_operator;
        changeDisplay = true;
        return;
    }
    last_key = new_operator;
    changeDisplay = true;
    // operação anterior
    if (operator != "") {
        let a: number = result;
        let b: number = parseFloat(numberFormatToNumber(display.innerHTML));
        result = calcule(a, b, operator);
        return;
    } else {
        operator = new_operator;
        let new_result = parseFloat(numberFormatToNumber(display.innerHTML));
        result = new_result;
    }

}

function numberFormatToNumber(text: string): string {
    let new_number: string = text.split(".").join("");
    return new_number.replace(",", ".");
}

function numberToNumberFormat(number_: string): string {
    let isNegativeNumber: boolean = false;
    if (number_.indexOf("-") != -1) {
        isNegativeNumber = true;
        number_ = number_.replace("-", "");
    }

    let number_format: string = "";
    let decimal: string = "";
    let dot_index: number = number_.indexOf(".");
    if (dot_index != -1) {
        decimal = "," + number_.slice(dot_index + 1, number_.length);
    }
    let index_for: number = (dot_index != -1) ? dot_index - 1 : number_.length - 1;
    let cont: number = 0;
    for (let y = index_for; y >= 0; y--) {
        cont += 1;
        number_format += number_[y];
        if ((cont % 3 == 0 && y != 0)) {
            number_format += ".";
        }
    }
    let result: string = inverter(number_format) + decimal;
    console.log("result> " + result);
    return isNegativeNumber ? "-" + result : result;
}


function inverter(text: string): string {
    if (text.length == 1) {
        return text;
    }
    let new_text = "";
    for (let x: number = text.length - 1; x >= 0; x--) {
        new_text += text[x];
    }
    return new_text;
}

/**
 * Inseri um número na tela
 * 
 */
function clickNumberButton(number: string) {
    let display: HTMLElement | null = document.getElementById("display");
    last_key = number;
    if (display == null) {
        return;
    }
    // caso ERR, bloqueia insersão
    if (display.innerHTML == ERROR_MESSAGE) {
        return;
    }
    // verifica se numero zero é válido
    if (number == "0") {
        if (!isValidZero()) {
            return;
        }
    }
    // verifica quantidade de digitos
    if (changeDisplay) {
        display.innerHTML = "";
        changeDisplay = false;
    }
    display.innerHTML = numberFormatToNumber(display.innerHTML);
    if ((display.innerHTML).indexOf(".") >= 0) {
        if ((display.innerHTML.length <= MAXIMO_DIGITS) && (countDecimalPlaces(String(display.innerHTML)) < DECIMAL_PLACES)) {
            if (display.innerHTML == "0") {
                display.innerHTML = numberToNumberFormat(display.innerHTML + number);
            } else {
                display.innerHTML = numberToNumberFormat(display.innerHTML + number);
            }
            return;
        }
        display.innerHTML = numberToNumberFormat(display.innerHTML);
    } else {
        if (display.innerHTML.length < MAXIMO_DIGITS) {
            if (display.innerHTML == "0") {
                display.innerHTML = number;
            } else {
                display.innerHTML = numberToNumberFormat(display.innerHTML + number);
            }
            return;
        }
        display.innerHTML = numberToNumberFormat(display.innerHTML);
    }

}

function clickEquals() {
    let display: HTMLElement | null = document.getElementById("display");
    if (display == null) {
        return;
    }
    // número seguido de operador 
    if (isOperator(last_key) || result == NaN) {
        operator = "";
        result = NaN;
        display.innerHTML = "0";
        return;
    }
    // após uma operação com erro
    if (display.innerHTML == ERROR_MESSAGE) {
        return;
    }
    result = calcule(result, parseFloat(numberFormatToNumber(display.innerHTML)), operator);
    changeDisplay = true;
    // mais de um clique no botão de igual
    if (last_key == "=") {
        display.innerHTML = "0";
        return;
    }
    // nenhuma operação realizada
    if (operator == "") {
        display.innerHTML = "0";
        return;
    }
    last_key = "=";
    if (isNaN(result) || (String(result).length > MAXIMO_DIGITS)) {
        display.innerHTML = ERROR_MESSAGE;
    } else {
        if (result == Infinity || result == NaN) {
            display.innerHTML = ERROR_MESSAGE;
            return;
        }
        display.innerHTML = numberToNumberFormat(String(result));
    }
    operator = "";
}

function isValidZero(): boolean {
    let display: HTMLElement | null = document.getElementById("display");
    if (display == null) {
        return;
    }
    // tela vazia
    if (display.innerHTML.length == 0) {
        return true;
    } else {
        // caso decimal
        if (hasDot(String(display.innerHTML))) {
            return true;
        }
        if (display.innerHTML[0] == "0") {
            return false
        } else {
            return true;
        }
    }

}

/**
 * Retorna a quantidade de casas decimais do número no display
 */
function countDecimalPlaces(text: string): number {
    let index_dot: number = text.indexOf(".");
    if (index_dot == -1) {
        return 0;
    } else {
        return (text.length - 1) - index_dot;
    }
}



function hasDot(text: string): boolean {
    return (text.indexOf(",") == -1) ? false : true;
}


function clickDot() {
    let display: HTMLElement | null = document.getElementById("display");
    if (display == null) {
        return;
    }
    //bloqueia inserção
    if (display.innerHTML == ERROR_MESSAGE) {
        return;
    }
    if (!hasDot(String(display.innerHTML))) {
        // caso nenhum número
        if (display.innerHTML == "") {
            display.innerHTML = "0,";
            return;
        }
        display.innerHTML = (display.innerHTML + ",");
    }

}

/**
 * Limpa tela
 * 
 * Limpa valor atual da tela
 */
function clickClean() {
    let display: HTMLElement | null = document.getElementById("display");
    if (display == null) {
        return;
    }
    if (display.innerHTML == ERROR_MESSAGE) {
        return;
    }
    if (isOperator(last_key)) {
        operator = "";
        display.innerHTML = String(result);
    } else if (last_key == "=") {
        display.innerHTML = "0";
        result = NaN;
    } else {
        display.innerHTML = "0";
    }

}

/**
 * Limpa operação
 * 
 * Limpa o valor atual da tela e resultados anterior
 * 
 */
function clickAllClean() {
    let display: HTMLElement | null = document.getElementById("display");
    if (display == null) {
        return;
    }
    display.innerHTML = "0";
    result = NaN;
    operator = "";
}


function calcule(a: number, b: number, operator: string): number {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return NaN;
    }
}