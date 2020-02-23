var operador = "";
var last_number = 0;
const ERROR = "ERR";

/**
 * 
 * @param {*} newOperador 
 */
function clickOperador(newOperador) {
    var visor = document.getElementById("visor");
    // caso ERR, bloqueia insersão
    if (visor.innerHTML == ERROR) {
        return;
    }
    // operação anterior
    if (operador != "") {
        alert("last operador: " + operador);
        var a = parseFloat(last_number);
        var b = parseFloat(visor.innerHTML)
        last_number = calcule(a, b, operador);
        visor.innerHTML = "";
        //operador = ""
        return;
    }
    alert("operador: " + newOperador);
    operador = newOperador;
    last_number = parseFloat(visor.innerHTML);
    visor.innerHTML = "";
}



function clickEquals() {
    var visor = document.getElementById("visor");
    alert("last: " + last_number + ", visor: " + visor.innerHTML + ", operador: " + operador);
    last_number = calcule(last_number, parseFloat(visor.innerHTML), operador);
    visor.innerHTML = last_number;
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

/**
 * Inseri um número na tela
 * 
 */
function clickNumberButton(number) {
    var visor = document.getElementById("visor");
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
    if (hasDot()) {
        if (visor.innerHTML.length <= 8) {
            if (visor.innerHTML == "0") {
                visor.innerHTML += number;
            } else {
                visor.innerHTML = visor.innerHTML + number;
            }
        }
    } else {
        if (visor.innerHTML.length <= 7) {
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
    visor.innerHTML = "";

}

/**
 * Limpa operação
 * 
 * Limpa o valor atual da tela e resultados anterior
 * 
 */
function clickAllClean() {
    var visor = document.getElementById("visor");
    visor.innerHTML = "";
    last_number = "";
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
            if (b == 0) {
                return ERROR;
            }
            return a / b;
    }
}