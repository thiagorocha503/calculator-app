var operador = "";
var last_number = "";
const ERROR = "ERR";
var result = 0;

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
    operador = newOperador;
    last_number = visor.innerHTML;
    visor.innerHTML = "";
}



function clickEquals() {
    // caso nenhum operação escolhida
    if (operador == "") {
        return;
    }
    var visor = document.getElementById("visor");
    switch (operador) {
        case "+":
            result = parseFloat(last_number) + parseFloat(visor.innerHTML);
            break;
        case "-":
            result = parseFloat(last_number) - parseFloat(visor.innerHTML);
            break;
        case "*":
            result = parseFloat(last_number) * parseFloat(visor.innerHTML);
            break;
        case "/":
            var dividendo = parseFloat(visor.innerHTML);
            if (dividendo == 0) {
                result = ERROR;
                break;
            }
            result = parseFloat(last_number) / dividendo;
            break;
    }
    visor.innerHTML = result;
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
}