var operator = "";
var last_key = "";
var result = NaN;
var changeDisplay = true;
var ERROR_MESSAGE = "ERR";
var DECIMAL_PLACES = 3;
var MAXIMO_DIGITS = 8;
var NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var ENTER_KEY = 13;
var BACKSPACE_KEY = 8;
5;
//
window.addEventListener("keydown", function (event) {
    console.log("key code: " + event.keyCode + ", key char: " + event.key);
    if (isOperator(event.key)) {
        clickOperador(event.key);
    }
    else if (isNumber(event.key)) {
        clickNumberButton(event.key);
    }
    else if (event.key == ".") {
        clickDot();
    }
    else if (event.keyCode == ENTER_KEY) {
        clickEquals();
    }
    else if (event.keyCode == BACKSPACE_KEY) {
        clickLeftArrow();
    }
});
function isNumber(text) {
    if (text in NUMBERS) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Inverter sinal do número
 */
function clickInvert() {
    var visor = document.getElementById("visor");
    if (visor == null) {
        console.log("Click_invert visor null");
        return;
    }
    if (visor.innerHTML == ERROR_MESSAGE) {
        return;
    }
    var result_invert = (-1) * parseFloat(numberFormatToNumber(visor.innerHTML));
    visor.innerHTML = numberToNumberFormat(String(result_invert));
}
function clickLeftArrow() {
    var visor = document.getElementById("visor");
    if (visor == null) {
        return;
    }
    // tela com número zero
    if (visor.innerHTML == "0" || visor.innerHTML == ERROR_MESSAGE) {
        return;
    }
    visor.innerHTML = numberFormatToNumber(visor.innerHTML);
    var new_value = visor.innerHTML.substr(0, visor.innerHTML.length - 1);
    if (new_value == "") {
        visor.innerHTML = "0";
    }
    else {
        visor.innerHTML = numberToNumberFormat(new_value);
    }
}
// load and reload page
window.addEventListener("load", function (event) {
    var visor = document.getElementById("visor");
    if (visor == null) {
        return;
    }
    visor.innerHTML = "0";
});
//
function isOperator(a) {
    if (a == "+") {
        return true;
    }
    else if (a == "-") {
        return true;
    }
    else if (a == "*") {
        return true;
    }
    else if (a == "/") {
        return true;
    }
    return false;
}
function clickOperador(new_operator) {
    var visor = document.getElementById("visor");
    if (visor == null) {
        return;
    }
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
        var a = result;
        var b = parseFloat(numberFormatToNumber(visor.innerHTML));
        result = calcule(a, b, operator);
        return;
    }
    else {
        operator = new_operator;
        var new_result = parseFloat(numberFormatToNumber(visor.innerHTML));
        result = new_result;
    }
}
function numberFormatToNumber(text) {
    var new_number = text.split(".").join("");
    return new_number.replace(",", ".");
}
function numberToNumberFormat(number_) {
    number_ = String(number_);
    var number_format = "";
    var decimal = "";
    var dot_index = number_.indexOf(".");
    if (dot_index != -1) {
        decimal = "," + number_.slice(dot_index + 1, number_.length);
    }
    var index_for = (dot_index != -1) ? dot_index - 1 : number_.length - 1;
    var cont = 0;
    for (var y = index_for; y >= 0; y--) {
        cont += 1;
        number_format += number_[y];
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
    var new_text = "";
    for (var x = text.length - 1; x >= 0; x--) {
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
    if (visor == null) {
        return;
    }
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
            }
            else {
                visor.innerHTML = numberToNumberFormat(visor.innerHTML + number);
            }
            return;
        }
        visor.innerHTML = numberToNumberFormat(visor.innerHTML);
    }
    else {
        if (visor.innerHTML.length < MAXIMO_DIGITS) {
            if (visor.innerHTML == "0") {
                visor.innerHTML = number;
            }
            else {
                visor.innerHTML = numberToNumberFormat(visor.innerHTML + number);
            }
            return;
        }
        visor.innerHTML = numberToNumberFormat(visor.innerHTML);
    }
}
function clickEquals() {
    var visor = document.getElementById("visor");
    if (visor == null) {
        return;
    }
    // número seguido de operador 
    if (isOperator(last_key) || result == NaN) {
        operator = "";
        result = NaN;
        visor.innerHTML = "0";
        return;
    }
    // após uma operação com erro
    if (visor.innerHTML == ERROR_MESSAGE) {
        return;
    }
    result = calcule(result, parseFloat(numberFormatToNumber(visor.innerHTML)), operator);
    changeDisplay = true;
    // mais de um clique no botão de igual
    if (last_key == "=") {
        visor.innerHTML = "0";
        return;
    }
    // nenhuma operação realizada
    if (operator == "") {
        visor.innerHTML = "0";
        return;
    }
    last_key = "=";
    if (isNaN(result) || (String(result).length > MAXIMO_DIGITS)) {
        visor.innerHTML = ERROR_MESSAGE;
    }
    else {
        if (result == Infinity || result == NaN) {
            visor.innerHTML = ERROR_MESSAGE;
            return;
        }
        visor.innerHTML = numberToNumberFormat(String(result));
    }
    operator = "";
}
function isValidZero() {
    var visor = document.getElementById("visor");
    if (visor == null) {
        return;
    }
    // tela vazia
    if (visor.innerHTML.length == 0) {
        return true;
    }
    else {
        // caso decimal
        if (hasDot(String(visor.innerHTML))) {
            return true;
        }
        if (visor.innerHTML[0] == "0") {
            return false;
        }
        else {
            return true;
        }
    }
}
/**
 * Retorna a quantidade de casas decimais do número no visor
 */
function countDecimalPlaces(text) {
    var index_dot = text.indexOf(".");
    if (index_dot == -1) {
        return 0;
    }
    else {
        return (text.length - 1) - index_dot;
    }
}
function hasDot(text) {
    return (text.indexOf(",") == -1) ? false : true;
}
function clickDot() {
    var visor = document.getElementById("visor");
    if (visor == null) {
        return;
    }
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
    if (visor == null) {
        return;
    }
    if (visor.innerHTML == ERROR_MESSAGE) {
        return;
    }
    if (isOperator(last_key)) {
        operator = "";
        visor.innerHTML = String(result);
    }
    else if (last_key == "=") {
        visor.innerHTML = "0";
        result = NaN;
    }
    else {
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
    if (visor == null) {
        return;
    }
    visor.innerHTML = "0";
    result = NaN;
    operator = "";
}
function calcule(a, b, operator) {
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
