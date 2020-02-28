var operator = "";
var last_key = "";
var result = 0;
const ERROR_MESSAGE = "ERR";
const DECIMAL_PLACES = 3;
const MAXIMO_DIGITS = 8
var changeDisplay = true;

/**
 * Inverter sinal do número
 */
function clickInvert() {
    if (visor.innerHTML == ERROR_MESSAGE) {
        return;
    }
    var visor = document.getElementById("visor");
    var invert_result = (-1) * parseFloat(numberFormatToNumber(visor.innerHTML));
    visor.innerHTML = numberToNumberFormat(invert_result);

}


function clickLeftArrow() {
    var visor = document.getElementById("visor");
    // tela com número zero
    if (visor.innerHTML == "0" || visor.innerHTML == ERROR_MESSAGE) {
        return;
    }
    visor.innerHTML = numberFormatToNumber(visor.innerHTML);
    new_value = visor.innerHTML.substr(0, visor.innerHTML.length - 1);
    if (new_value == "") {
        visor.innerHTML = "0";
    } else {
        visor.innerHTML = numberToNumberFormat(new_value);
    }

}

// load and reload page
window.addEventListener("load", function(event) {
    var visor = document.getElementById("visor");
    visor.innerHTML = "0";
});
/**
 * 
 * @param {*} new_operator 
 */

function isOperator(a) {
    if (a == "+") {
        return true;
    } else if (a == "-") {
        return true;
    } else if (a == "*") {
        return true;
    } else if (a == "/") {
        return true;
    }
    return false;
}

function clickOperador(new_operator) {
    var visor = document.getElementById("visor");
    // caso ERR, bloqueia insersão
    if (visor.innerHTML == ERROR_MESSAGE) {
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
        //alert("last operator: " + operator);
        var a = parseFloat(result);
        var b = parseFloat(numberFormatToNumber(visor.innerHTML));
        //alert("a: " + a + "b: " + b);
        result = calcule(a, b, operator);
        return;
    } else {
        //alert("operator: " + new_operator);
        operator = new_operator;
        new_result = parseFloat(numberFormatToNumber(visor.innerHTML));
        //alert(new_result);
        result = new_result;
    }

}

function numberFormatToNumber(text) {
    var new_number = text.split(".").join("");
    return new_number.replace(",", ".");
}

function numberToNumberFormat(number) {
    number = String(number);
    number_format = "";
    decimal = "";
    dot_index = number.indexOf(".");
    if (dot_index != -1) {
        decimal = "," + number.slice(dot_index + 1, number.length);
    }
    index_for = (dot_index != -1) ? dot_index - 1 : number.length - 1;
    cont = 0;
    for (y = index_for; y >= 0; y--) {
        cont += 1;
        number_format += number[y];
        if ((cont % 3 == 0 && y != 0)) {
            number_format += ".";
        }
    }
    return inverter(number_format) + decimal;
}


function inverter(text) {
    if (text.length == 1) {
        return text;
    }
    new_text = "";
    for (x = text.length - 1; x >= 0; x--) {
        new_text += text[x];
    }
    return new_text;
}

/**
 * Inseri um número na tela
 * 
 */
function clickNumberButton(number) {
    var visor = document.getElementById("visor");
    last_key = number;
    // caso ERR, bloqueia insersão
    if (visor.innerHTML == ERROR_MESSAGE) {
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
        visor.innerHTML = "";
        changeDisplay = false;
    }
    visor.innerHTML = numberFormatToNumber(visor.innerHTML);
    if ((visor.innerHTML).indexOf(".") >= 0) {
        if ((visor.innerHTML.length <= MAXIMO_DIGITS) && (countDecimalPlaces(String(visor.innerHTML)) < DECIMAL_PLACES)) {
            if (visor.innerHTML == "0") {
                visor.innerHTML = numberToNumberFormat(visor.innerHTML + number);
            } else {
                visor.innerHTML = numberToNumberFormat(visor.innerHTML + number);
            }
            return;
        }
        visor.innerHTML = numberToNumberFormat(visor.innerHTML);
    } else {
        if (visor.innerHTML.length < MAXIMO_DIGITS) {
            if (visor.innerHTML == "0") {
                visor.innerHTML = number;
            } else {
                visor.innerHTML = numberToNumberFormat(visor.innerHTML + number);
            }
            return;
        }
        visor.innerHTML = numberToNumberFormat(visor.innerHTML);
    }

}

function clickEquals() {
    var visor = document.getElementById("visor");
    // número seguido de operador 
    if (isOperator(last_key) || result == "") {
        operator = "";
        result = "";
        visor.innerHTML = "0";
        return;
    }
    // após uma operação com erro
    if (visor.innerHTML == ERROR_MESSAGE) {
        return;
    }
    //alert("last: " + result + ", visor: " + parseFloat(numberFormatToNumber(visor.innerHTML)) + ", operator: " + operator);
    result = calcule(result, parseFloat(numberFormatToNumber(visor.innerHTML)), operator);
    changeDisplay = true;
    // mais de um clique no botão de igual
    if (last_key == "=") {
        visor.innerHTML = "0";
        return;
    }
    // nenhuma operação realizada
    if (operator == "") {
        return;
    }
    last_key = "=";
    if (isNaN(result) || (String(result).length > MAXIMO_DIGITS)) {
        visor.innerHTML = ERROR_MESSAGE;
    } else {
        if (result == Infinity) {
            visor.innerHTML = ERROR_MESSAGE;
            return;
        }
        //alert("result: " + result + ", form: " + numberToNumberFormat(String(result)))
        visor.innerHTML = numberToNumberFormat(String(result));
    }
    operator = "";
}

function isValidZero() {
    var visor = document.getElementById("visor");
    // tela vazia
    if (visor.innerHTML.length == 0) {
        return true;
    } else {
        // caso decimal
        if (hasDot(String(visor.innerHTML))) {
            return true;
        }
        if (visor.innerHTML[0] == "0") {
            return false
        } else {
            return true;
        }
    }

}

function countDecimalPlaces(text) {
    let index_dot_2 = text.indexOf(".");
    if (index_dot_2 == -1) {
        return 0;
    } else {
        return (text.length - 1) - index_dot_2;
    }
}



function hasDot(text) {
    return (text.indexOf(",") == -1) ? false : true;
}

/**
 * Retorna a quantidade de casas decimais do número no visor
 */
function clickDot() {
    var visor = document.getElementById("visor");
    var visor = document.getElementById("visor");
    //bloqueia inserção
    if (visor.innerHTML == ERROR_MESSAGE) {
        return;
    }
    if (!hasDot(String(visor.innerHTML))) {
        // caso nenhum número
        if (visor.innerHTML == "") {
            visor.innerHTML = "0,";
            return;
        }
        visor.innerHTML = (visor.innerHTML + ",");
    }

}

/**
 * Limpa tela
 * 
 * Limpa valor atual da tela
 */
function clickClean() {
    var visor = document.getElementById("visor");
    if (isOperator(last_key)) {
        operator = "";
        visor.innerHTML = result;
    } else if (last_key == "=") {
        visor.innerHTML = "0";
        result = "";
    } else {
        visor.innerHTML = "0";
    }

}

/**
 * Limpa operação
 * 
 * Limpa o valor atual da tela e resultados anterior
 * 
 */
function clickAllClean() {
    var visor = document.getElementById("visor");
    visor.innerHTML = "0";
    result = "";
    operator = "";
}

function calcule(a, b, operator) {
    var visor = document.getElementById("visor");
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
    }
}