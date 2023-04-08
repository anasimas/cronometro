document.addEventListener('DOMContentLoaded', () => {
    let botaoNormal = document.getElementById('seletorNormal');
    let botaoPomodoro = document.getElementById('seletorPomodoro');
    let botaoVoltar = document.getElementById('botaoVoltar');
    let elementoSeletor = document.getElementById('seletorTipoCronometro');
    let elementoCronometro = document.getElementById('cronometro');
    let cronometroSelecionado = '';
    let pomodoroSelecionado = '';
    let intervalo;
    let divControlePomodoro;
    let botaoConcentracao;
    let botaoDescanso;
    
    // funções referentes ao seletor do tipo de cronometro
    botaoNormal.addEventListener("click", () => {
        elementoSeletor.style.display = "none";
        elementoCronometro.style.display = "flex";
        cronometroSelecionado = 'normal';
        seg.innerHTML = "00";
        min.innerHTML = "00";
        hora.innerHTML = "00";
        minAtual = 0;
        segAtual = 0;
        horaAtual = 0;
    });

    botaoPomodoro.addEventListener("click", () => {
        elementoSeletor.style.display = "none";
        elementoCronometro.style.display = "flex";
        cronometroSelecionado = 'pomodoro';

        //Criação dinamica os controles do pomodoro
        divControlePomodoro = document.createElement('div');
        //Cria a div que vai conter os controles

        divControlePomodoro.setAttribute('id', 'controlesPomodoro');

        //Cria os botões e atribui eles à div anterior
        botaoConcentracao = document.createElement('button');
        botaoConcentracao.innerText = 'Concentração';
        botaoConcentracao.setAttribute('id', 'botaoConcentracao');
        divControlePomodoro.appendChild(botaoConcentracao);

        botaoDescanso = document.createElement('button')
        botaoDescanso.innerText = 'Descanso';
        botaoDescanso.setAttribute('id', 'botaoDescanso');
        divControlePomodoro.appendChild(botaoDescanso);

        elementoCronometro.appendChild(divControlePomodoro);

        //Adiciona os listeners para os botões criados
        botaoDescanso.addEventListener("click", () => {
            pomodoroSelecionado = 'descanso';
            minAtual = 5;
            segAtual = 0;
            seg.innerHTML = "00";
            min.innerHTML = "05";
            hora.innerHTML = "00";
        });

        botaoConcentracao.addEventListener("click", () => {
            pomodoroSelecionado = 'concentracao';
            minAtual = 25;
            segAtual = 0;
            seg.innerHTML = "00";
            min.innerHTML = "25";
            hora.innerHTML = "00";
        });
    });

    botaoVoltar.addEventListener("click", () => {
        elementoSeletor.style.display = "grid";
        elementoCronometro.style.display = "none";
        
        clearInterval(intervalo);
        botaoPlay.disabled = false;
        botaoPause.disabled = true;
        botaoReset.disabled = true;

        if (cronometroSelecionado == 'pomodoro') {
            divControlePomodoro.removeChild(botaoConcentracao, botaoDescanso);
            elementoCronometro.removeChild(divControlePomodoro);
            pomodoroSelecionado = '';
        }
        cronometroSelecionado = '';
        seg.innerHTML = "00";
        min.innerHTML = "00";
        hora.innerHTML = "00";
        minAtual = 0;
        segAtual = 0;
        horaAtual = 0;

    });

    // funções referentes aos cronômetros e controles

    let botaoPlay = document.getElementById('play');
    let botaoPause = document.getElementById('pause');
    let botaoReset = document.getElementById('reset');

    let hora = document.getElementById('hora');
    let min = document.getElementById('min');
    let seg = document.getElementById('seg');

    let segAtual = 0;
    let minAtual = 0;
    let horaAtual = 0;

    botaoPlay.addEventListener("click", () => {
        if (cronometroSelecionado == 'normal') {
            intervalo = setInterval(cronometro, 1000);
        } else {
            if (pomodoroSelecionado == 'concentracao') {
                intervalo = setInterval(pomodoroConcentracao, 1000);
            } else if (pomodoroSelecionado == 'descanso') {
                intervalo = setInterval(pomodoroDescanso, 1000);
            } else {
                alert('Selecione entre descanso e concentração!');
                botaoPlay.disabled = false;
                botaoPause.disabled = true;
                botaoReset.disabled = true;
            }
        }

        if (intervalo) {
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
                if (cronometroSelecionado == 'normal') {
                    min.innerHTML = "00";
                } else {
                    if (pomodoroSelecionado == 'concentracao') {
                        min.innerHTML = "25"
                    } else {
                        min.innerHTML = "05"
                    }
                }
                hora.innerHTML = "00";

                segAtual = 0;
                minAtual = 0;
                horaAtual = 0;
            });
        }
    })

    function cronometro() {
        if (segAtual <= 60) {
            if (segAtual <= 9) {
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
                    if (minAtual <= 9) {
                        minAtual++;
                        min.innerHTML = "0" + minAtual;
                    } else {
                        minAtual++;
                        min.innerHTML = minAtual;
                    }

                    if (minAtual === 60) {
                        minAtual = 0;
                        min.innerHTML = "00";

                        if (horaAtual <= 9) {
                            hora.innerHTML = "0" + horaAtual;
                        }
                    }
                }
            }
        }
    }

    function pomodoroConcentracao() {
        if (segAtual > 0) {
            segAtual--;
            seg.innerHTML = segAtual;
            if (segAtual <= 9) {
                segAtual--;
                seg.innerHTML = "0" + segAtual;
            }
        } else if (segAtual === 0) {
            segAtual = 59;
            seg.innerHTML = segAtual;
            if (minAtual <= 25) {
                if (minAtual <= 9) {
                    minAtual--;
                    min.innerHTML = "0" + minAtual;
                } else {
                    minAtual--;
                    min.innerHTML = minAtual;
                }
            }
        }
    }

    function pomodoroDescanso() {
        if (segAtual > 0) {
            console.log("1")
            segAtual--;
            seg.innerHTML = segAtual;
            if (segAtual <= 9) {
                console.log("2")
                segAtual--;
                seg.innerHTML = "0" + segAtual;
            }
        } else if (segAtual === 0) {
            console.log("3")
            segAtual = 59;
            seg.innerHTML = segAtual;
            if (minAtual <= 5) {
                console.log("4")
                minAtual--;
                min.innerHTML = "0" + minAtual;
            }
        }
    }
});