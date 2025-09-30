const bobEsponja = document.getElementById('spongebob');
const jogo = document.getElementById('jogo');
const placar = document.getElementById('placar');
let pontos = 0;
let estaPulando = false;
let jogoRodando = true;

function pular() {
    if (estaPulando) return;
    estaPulando = true;
    let posicaoPulo = 0;
    const intervaloPulo = setInterval(() => {
        // Subida
        if (posicaoPulo < 150) {
            posicaoPulo += 8;
            bobEsponja.style.bottom = posicaoPulo + 'px';
        } 
        // Descida
        else if (posicaoPulo >= 0) {
            posicaoPulo -= 8;
            bobEsponja.style.bottom = posicaoPulo + 'px';
            if (posicaoPulo <= 0) {
                clearInterval(intervaloPulo);
                bobEsponja.style.bottom = '0px'; // Garante que volta ao chão
                estaPulando = false;
            }
        }
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        pular();
    }
});
function criarObstaculo() {
    if (!jogoRodando) return;

    const obstaculo = document.createElement('div');
    obstaculo.classList.add('obstaculo');
    jogo.appendChild(obstaculo);

    let posicaoObstaculo = 800; // Largura do #jogo

    const intervaloMovimento = setInterval(() => {
        if (!jogoRodando) {
            clearInterval(intervaloMovimento);
            return;
        }

        // 1. Colisão
        const bobRetangulo = bobEsponja.getBoundingClientRect();
        const obsRetangulo = obstaculo.getBoundingClientRect();

        // Lógica de colisão simplificada (ajuste as coordenadas para ser mais preciso)
        if (obsRetangulo.left < bobRetangulo.right && 
            obsRetangulo.right > bobRetangulo.left && 
            obsRetangulo.top < bobRetangulo.bottom && 
            obsRetangulo.bottom > bobRetangulo.top) {
            
            alert(`Fim de Jogo! Pontuação: ${pontos}`);
            jogoRodando = false;
            clearInterval(intervaloMovimento);
            jogo.removeChild(obstaculo); // Remove o obstáculo
            window.location.reload(); // Reinicia o jogo
            return;
        }

        // 2. Movimento
        posicaoObstaculo -= 5; // Velocidade
        obstaculo.style.right = posicaoObstaculo + 'px';

        // 3. Remoção e Pontuação
        if (posicaoObstaculo <= -40) { // Saiu da tela
            clearInterval(intervaloMovimento);
            jogo.removeChild(obstaculo);
            pontos++;
            placar.textContent = `Pontos: ${pontos}`;
        }
    }, 20);
}

// Inicia a geração de obstáculos em intervalos
setInterval(criarObstaculo, 2000); // Gera um novo obstáculo a cada 2 segundos