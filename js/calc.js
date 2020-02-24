var operador = "";
var last_tecla = "";
var result = 0;
const ERROR = "ERR";
const DECIMAL_PLACES = 2;
const MAXIMO_DIGITS = 8
var changeVisor = true;

// load and reload page
window.addEventListener("load", function(event) {
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
    }
    // nenhuma operação realizada
    if (operador == "") {
        return;
    }
    last_tecla = "=";
    if (isNaN(result) || (result > 99999999)) {
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
        if (hasDot()) {
            return true;
        }
        if (visor.innerHTML[0] == "0") {
            return false
        } else {
            return true;
        }
    }

}

function countDecimalPlaces() {
    var visor = document.getElementById("visor");
    for (var i = 0; i < visor.innerHTML.length; i++) {
        if (visor.innerHTML[i] == ".") {
            return (visor.innerHTML.length - 1) - i;
        }
    }
    return 0;
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
    if (hasDot()) {
        //        alert("> " + countDecimalPlaces());
        if ((visor.innerHTML.length <= MAXIMO_DIGITS + 1) && (countDecimalPlaces() <= 2)) {
            if (visor.innerHTML == "0") {
                visor.innerHTML += number;
            } else {
                visor.innerHTML = visor.innerHTML + number;
            }
        }
    } else {
        if (visor.innerHTML.length < MAXIMO_DIGITS) {
            if (visor.innerHTML == "0") {
                visor.innerHTML = number;
            } else {
                visor.innerHTML = visor.innerHTML + number;
            }

        }
    }

}


function hasDot() {
    var visor = document.getElementById("visor").innerHTML;
    for (var i = 0; i < visor.length; i++) {
        if (visor[i] == ".") {
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
    if (!hasDot()) {
        // caso nenhum número
        if (visor.innerHTML == "") {
            visor.innerHTML = "0.";
            return;
        }
        visor.innerHTML = (visor.innerHTML + ".");
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