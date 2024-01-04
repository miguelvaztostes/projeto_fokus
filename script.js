//Variaveis coletando elementos do html
const html = document.querySelector('html');
const btn_foco = document.querySelector('.app__card-button--foco');
const btn_curto = document.querySelector('.app__card-button--curto');
const btn_longo = document.querySelector('.app__card-button--longo');
const img = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const imgBtn = document.querySelector('.app__card-primary-butto-icon')
const musicaFocoInput = document.querySelector('#alternar-musica');
const IniciarOuPausarBtn = document.querySelector('#start-pause span');
const TempoNaTela = document.querySelector('#timer');
const musica = new Audio ('/sons/luna-rise-part-one.mp3');
const musica2 = new Audio ('/sons/pause.mp3');
const musica3 = new Audio ('/sons/play.wav');
const musica4 = new Audio ('/sons/beep.mp3');

const startPauseBtn = document.querySelector('.app__card-primary-button');

let tempoSeg = 1500
let intervaloId = null;

musica.loop = true;


//dinâmica que faz que quando há um click no btn ocorra uma alteração

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

btn_foco.addEventListener('click', () => {
         tempoSeg = 1500;
        alterarContexto('foco');
        btn_foco.classList.add('active');
})

btn_curto.addEventListener('click', () => {
         tempoSeg = 300;
        alterarContexto('descanso-curto')
        btn_curto.classList.add('active');
})

btn_longo.addEventListener('click', () => {
      tempoSeg = 900
        alterarContexto('descanso-longo');
        btn_longo.classList.add('active');
}
)

//função para adaptar de acordo com o conteudo do btn

function alterarContexto(contexto){
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    img.setAttribute('src', `imagens/${contexto}.png`)
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto' :
            titulo.innerHTML = `Que tal dar uma respirada,<br>
            <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de parar.,<br>
            <strong class="app__title-strong">Faça uma pausa longa!.</strong>`
            default:
                break;
    }
    

}

//Temporizador
const contagemRegressiva = () => {
    if(tempoSeg <= 0){
        musica4.play()
        alert('Tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar();
        return
    }
    tempoSeg -= 1;
    mostrarTempo()
}

startPauseBtn.addEventListener('click', () => {
    iniciarOuPausar();
    if(tempoSeg == 5){
        musica3.play()
    }else{
        musica3.pause()
    }
    
});

function iniciarOuPausar() {
    if(intervaloId){
        zerar();
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    IniciarOuPausarBtn.textContent = "Pausar"
    imgBtn.setAttribute('src', '/imagens/pause.png')

}

function zerar(){
    clearInterval(intervaloId);
    IniciarOuPausarBtn.textContent = "Começar"
    imgBtn.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
    musica2.play();
}

function mostrarTempo(){
    const Tempo = new Date(tempoSeg * 1000);
    const tempoNovo = Tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    TempoNaTela.innerHTML = `${tempoNovo}`;
}

mostrarTempo()