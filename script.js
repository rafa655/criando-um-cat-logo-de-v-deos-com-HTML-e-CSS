// Variável global para controlar o tamanho da fonte
let fontScale = 1;

/**
 * Ativa e desativa o modo de alto contraste.
 * Alterna a classe 'high-contrast' no corpo do documento e atualiza
 * os atributos ARIA para informar aos leitores de tela.
 */
function toggleContrast() {
    const body = document.body;
    const btn = document.getElementById('contrast-btn');
    
    // Alterna a classe de alto contraste
    body.classList.toggle('high-contrast');
    
    // Verifica se a classe está ativa e atualiza o estado ARIA
    const isHighContrast = body.classList.contains('high-contrast');
    if (btn) {
        btn.setAttribute('aria-pressed', isHighContrast);
    }
}

/**
 * Modifica o tamanho do texto global da página de forma proporcional.
 * @param {number} delta - Quantidade de incremento ou decremento (ex: 0.1 ou -0.1).
 */
function changeFontSize(delta) {
    fontScale += delta;
    
    // Estabelece limites mínimos e máximos para evitar distorções
    if (fontScale < 0.8) fontScale = 0.8;
    if (fontScale > 1.8) fontScale = 1.8;
    
    // Aplica a variável CSS personalizada ao documento
    document.documentElement.style.setProperty('--font-scale', fontScale);
}

/**
 * Reproduz o arquivo de áudio guia do portal ou utiliza a síntese de voz
 * nativa do navegador (Web Speech API) se não houver arquivo de áudio configurado.
 */
function playAudioGuide() {
    const audioPlayer = document.getElementById('audio-guide');
    
    // Tenta reproduzir o arquivo de áudio se existir um link válido
    if (audioPlayer && audioPlayer.getAttribute('src') && audioPlayer.getAttribute('src') !== 'audio-guia-portal.mp3') {
        audioPlayer.play().catch(error => {
            console.warn("Não foi possível reproduzir o arquivo de áudio:", error);
            speakText("Bem-vindo ao portal acessível de autoajuda e apoio multissensorial.");
        });
    } else {
        // Alternativa acessível: Síntese de voz nativa se não houver arquivo enviado
        speakText("Bem-vindo ao portal acessível de autoajuda e apoio multissensorial. Utilize os botões superiores para ajustar o contraste ou o tamanho do texto.");
    }
}

/**
 * Função auxiliar para ler texto em voz alta (útil para pessoas com deficiência visual).
 * @param {string} text - O texto que o navegador irá ler.
 */
function speakText(text) {
    if ('speechSynthesis' in window) {
        // Cancela qualquer leitura prévia em andamento
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; // Idioma configurado para Português do Brasil
        utterance.rate = 0.9;     // Velocidade de leitura ligeiramente reduzida para maior clareza
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Seu navegador não suporta a leitura de texto por voz.");
    }
}

// Inicialização de atalhos de teclado para melhorar a acessibilidade motora
document.addEventListener('keydown', function(event) {
    // Tecla 'Alt + C' para alternar Alto Contraste
    if (event.altKey && (event.key === 'c' || event.key === 'C')) {
        toggleContrast();
    }
    // Tecla 'Alt + +' para aumentar o texto
    if (event.altKey && (event.key === '+' || event.key === '=')) {
        changeFontSize(0.1);
    }
    // Tecla 'Alt + -' para diminuir o texto
    if (event.altKey && event.key === '-') {
        changeFontSize(-0.1);
    }
});