var operador = "";
var last_tecla = "";
var result = 0;
const ERROR = "ERR";
const DECIMAL_PLACES = 3;
const MAXIMO_DIGITS = 8
var changeVisor = true;

/**
 * Inverter sinal do número
 */
function clickInvert() {
    var visor = document.getElementById("visor");
    visor.innerHTML = (-1) * parseFloat(visor.innerHTML);

}

function clickLeftArrow() {
    var visor = document.getElementById("visor");
    // tela com número zero
    if (visor.innerHTML == "0") {
        return;
    }
    visor.innerHTML = numberFormatToNumber(visor.innerHTML);
    new_value = visor.innerHTML.substr(0, visor.innerHTML.length - 1);
    if (new_value == "") {
        visor.innerHTML = "0";
    } else {
        visor.innerHTML = formatNumber(new_value);
    }

}

// load and reload page
window.addEventListener("load", function(event) {
    var visor = document.getElementById("visor");
    visor.innerHTML = "0";
});
/**
 * 
 * @param {*} newOperador 
 */

function isOperador(a) {
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

function clickOperador(newOperador) {
    var visor = document.getElementById("visor");
    // caso ERR, bloqueia insersão
    if (visor.innerHTML == ERROR) {
        return;
    }
    if (isOperador(last_tecla)) {
        operador = newOperador;
        last_tecla = newOperador;
        changeVisor = true;
        return;
    }


    last_tecla = newOperador;
    changeVisor = true;
    // operação anterior
    if (operador != "") {
        //       alert("last operador: " + operador);
        var a = parseFloat(result);
        var b = parseFloat(visor.innerHTML);
        result = calcule(a, b, operador);
        return;
    } else {
        //        alert("operador: " + newOperador);
        operador = newOperador;
        result = parseFloat(visor.innerHTML);
    }

}

function numberFormatToNumber(text) {
    result = text.split(".").join("");
    return result.replace(",", ".");
}

function formatNumber(number) {
    number_format = "";
    decimal = "";
    ponto_index = number.indexOf(".");
    //alert("text: " + number + ", ponto: " + index);

    if (ponto_index != -1) {
        decimal = "," + number.slice(ponto_index + 1, number.length);
        // alert("decimal: " + decimal);
    }
    index_for = (ponto_index != -1) ? ponto_index - 1 : number.length - 1;
    //alert("> " + index_for);
    cont = 0;
    for (y = index_for; y >= 0; y--) {
        // alert("=> " + y);
        cont += 1;
        number_format += number[y];
        if ((cont % 3 == 0 && y != 0)) {
            //alert("y " + y);
            number_format += ".";
        }
        // alert(number_format);

    }
    // alert("{ " + number_format);
    return inverter(number_format) + decimal;
}


function inverter(text) {
    if (text.length == 1) {
        return text;
    }
    result = "";
    for (x = text.length - 1; x >= 0; x--) {
        result += text[x];
    }
    return result;
}

/**
 * Inseri um número na tela
 * 
 */
function clickNumberButton(number) {
    var visor = document.getElementById("visor");
    last_tecla = number;
    // caso ERR, bloqueia insersão
    //alert(""+number,"");
    if (visor.innerHTML == ERROR) {
        return;
    }
    // verifica se numero zero é válido
    if (number == "0") {
        if (!isValidZero()) {
            return;
        }
    }
    // verifica quantidade de digitos
    if (changeVisor) {
        visor.innerHTML = "";
        changeVisor = false;
    }

    //alert(numberFormatToNumber("3.123,5"));
    //var message = formatNumber("65432.1");
    //alert(message);
    visor.innerHTML = numberFormatToNumber(visor.innerHTML);
    if ((visor.innerHTML).indexOf(".") >= 0) {
        alert("> " + visor.innerHTML);
        if ((visor.innerHTML.length <= MAXIMO_DIGITS) && (countDecimalPlaces(String(visor.innerHTML)) < DECIMAL_PLACES)) {
            alert("menor");
            if (visor.innerHTML == "0") {
                visor.innerHTML = formatNumber(visor.innerHTML + number);
            } else {
                visor.innerHTML = formatNumber(visor.innerHTML + number);
            }
            return;
        }
        visor.innerHTML = formatNumber(visor.innerHTML);
    } else {
        if (visor.innerHTML.length < MAXIMO_DIGITS) {
            if (visor.innerHTML == "0") {
                visor.innerHTML = number;
            } else {
                visor.innerHTML = formatNumber(visor.innerHTML + number);
            }
            return;
        }
        visor.innerHTML = formatNumber(visor.innerHTML);
    }

}

function clickEquals() {
    var visor = document.getElementById("visor");
    //    alert("last: " + result + ", visor: " + visor.innerHTML + ", operador: " + operador);
    result = calcule(result, parseFloat(visor.innerHTML), operador);
    changeVisor = true;
    // número seguido de operador 
    if (isOperador(last_tecla)) {
        return;
    }
    // mais de um clique no botão de igual
    if (last_tecla == "=") {
        visor.innerHTML = "0";
        return;
    }
    // nenhuma operação realizada
    if (operador == "") {
        return;
    }
    last_tecla = "=";
    if (isNaN(result) || (String(result).length > MAXIMO_DIGITS)) {
        visor.innerHTML = ERROR;
    } else {
        visor.innerHTML = result;
    }
    operador = "";
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
    for (var i = 0; i < text.length; i++) {
        if (text[i] == ".") {
            return (text.length - 1) - i;
        }
    }
    return 0;
}



function hasDot(text) {
    for (var i = 0; i < text.length; i++) {
        if (text[i] == ",") {
            return true;
        }
    }
    return false;
}

/**
 * Retorna a quantidade de casas decimais do número no visor
 */
function clickDot() {
    var visor = document.getElementById("visor");
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
    if (isOperador(last_tecla)) {
        operador = "";
        visor.innerHTML = result;
    } else if (last_tecla == "=") {
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
    operador = "";
}

function calcule(a, b, operador) {
    var visor = document.getElementById("visor");
    switch (operador) {
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