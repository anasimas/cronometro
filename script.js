document.addEventListener('DOMContentLoaded', () => {
    let botaoNormal = document.getElementById('seletorNormal');
    let botaoPomodoro = document.getElementById('seletorPomodoro');
    let botaoVoltar = document.querySelectorAll('.botaoVoltar');
    let elementoSeletor = document.getElementById('seletorTipoCronometro');
    let elementoCronometroNormal = document.getElementById('cronometroNormal');
    let elementoPomodoro = document.getElementById('cronometroPomodoro');

    // funções referentes ao seletor do tipo de cronometro
    botaoNormal.addEventListener("click", () => {
        elementoSeletor.style.display = "none";
        elementoCronometroNormal.style.display = "flex";
    });

    botaoPomodoro.addEventListener("click", () => {
        elementoSeletor.style.display = "none";
        elementoPomodoro.style.display = "flex";
    })

    botaoVoltar.forEach(botaoVoltar => {
        botaoVoltar.addEventListener("click", () => {
            elementoSeletor.style.display = "grid";
            elementoCronometroNormal.style.display = "none";
            elementoPomodoro.style.display = "none";
        })
    });

    // funções relacionadas ao pomodoro

    // funções referentes ao cronometro normal

    let botaoPlay = document.querySelectorAll('.play');
    let botaoPause = document.querySelectorAll('.pause');
    let botaoReset = document.querySelectorAll('.reset');

    let hora = document.getElementsByClassName('hora');
    let min = document.getElementsByClassName('min');
    let seg = document.getElementsByClassName('seg');

    let segAtual = 0;
    let minAtual = 0;
    let horaAtual = 0;

    botaoPlay.addEventListener("click", () => {
        var intervalo = setInterval(cronometro, 1000);
        botaoPlay.disabled = true;
        botaoPause.disabled = false;
        botaoReset.disabled = false;

        botaoPause.addEventListener("click", () => {
            clearInterval(intervalo);
            botaoPlay.disabled = false;
            botaoPause.disabled = true;
            botaoReset.disabled = false;
        });
        botaoReset.addEventListener("click", () => {
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
        });
    })

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
});