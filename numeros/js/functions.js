var engine = {
    "numeros": ['0  zero ',
        '1  one ', '2  two', '  3  three', '4  four', '5  five', '6  six',
        '7  seven', '8  eight', '9  nine', '10  ten'
    ],
    "number": {
        'zero ': '0',
        'one': '1',
        "two": '2',
        "three": '3',
        "four": '4',
        "five": '5',
        "six": '6',
        "seven": '7',
        "eigth": '8',
        "nine": '9',
        "ten": '10',
    },
    "moedas": 0
}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function sortearNumero() {
    var indexNumeroSorteado = Math.floor(Math.random() * engine.numeros.length);
    var legendaNumeroDaCaixa = document.getElementById('numero-na-caixa');
    var nomeNumeroSorteado = engine.numeros[indexNumeroSorteado];

    legendaNumeroDaCaixa.innerText = engine.numeros[indexNumeroSorteado].toUpperCase();

    return engine.number[nomeNumeroSorteado];

}

function aplicarNumeroNaCaixa(nomeDoNumero) {
    var caixaDosNumeros = document.getElementById('numero-atual');
    caixaDosNumeros.style.backgroundColor = 'nomeDoNumero';
}

function aplicarNumeroNaCaixa(nomeDoNumero) {
    var caixaDosNumeros = document.getElementById('numero-atual');

    caixaDosNumeros.style.backgroundColor = nomeDoNumero;
    caixaDosNumeros.style.backgroundImage = "url('/img/caixa-fechada.png')";
    caixaDosNumeros.style.backgroundSize = "100%";

}

function atualizaPontuacao(valor) {
    var pontuacao = document.getElementById('pontuacao-atual');

    engine.moedas += valor;

    if (valor < 0) {
        audioErrou.play();
    } else {
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarNumeroNaCaixa(sortearNumero())

//API DE RECONHECIMENTO DE VOZ
var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta = "";

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";


    gravador.onstart = function() {
        btnGravador.innerText = "Estou Ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }

    gravador.onend = function() {
        btnGravador.innerText = "Responder";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
    }

    gravador.onresult = function(event) {
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById('numero-na-caixa').innerText.toUpperCase();

        if (transcricaoAudio === respostaCorreta) {
            atualizaPontuacao(1);
        } else {
            atualizaPontuacao(-1);
        }

        //   aplicarCorNaCaixa(sortearCor());

    }


} else {
    alert('não tem suporte');
}


btnGravador.addEventListener('click', function(e) {
    gravador.start();
})