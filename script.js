let botaoPlay = document.getElementById('play');
let botaoPause = document.getElementById('pause');
let botaoReset = document.getElementById('reset');

let hora = document.getElementById('hora');
let min = document.getElementById('min');
let seg = document.getElementById('seg');

let segAtual = 0;
let minAtual = 0;
let horaAtual = 0;

function play() {
    var intervalo = setInterval(cronometro, 1000);
    botaoPlay.disabled = true;
    botaoPause.disabled = false;
    botaoReset.disabled = false;

    botaoPause.addEventListener
}

function pause() {
    clearInterval(intervalo);
    botaoPlay.disabled = false;
    botaoPause.disabled = true;
    botaoReset.disabled = false;
}

function reset() {
    clearInterval(intervalo);
    botaoPlay.disabled = false;
    botaoPause.disabled = true;
    botaoReset.disabled = true;

    seg.innerHTML = "00";
    min.innerHTML = "00";
    hora.innerHTML = "00";

    segAtual = 0;
    minAtual = 0;
    horaAtual = 0;
}

function cronometro() {
    if (segAtual <= 60) {
        if (segAtual < 9) {
            segAtual++;
            seg.innerHTML = "0" + segAtual;
        } else {
            segAtual++;
            seg.innerHTML = segAtual;
        }

        if (segAtual === 60) {
            segAtual = 0;
            seg.innerHTML = "00";
            if (minAtual <= 60) {
                if (minAtual < 9) {
                    minAtual++;
                    min.innerHTML = "0" + minAtual;
                } else {
                    minAtual++;
                    min.innerHTML = minAtual;
                }

                if (minAtual === 60) {
                    minAtual = 0;
                    min.innerHTML = "00";

                    if (horaAtual < 9) {
                        hora.innerHTML = "0" + horaAtual;
                    }
                }
            }
        }
    }
}