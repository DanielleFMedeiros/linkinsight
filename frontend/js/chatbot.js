function sendMessage() {
    const userInputElement = document.getElementById('user-input');
    const userInput = userInputElement.value.trim();
    if (!userInput) return;

    addMessage(userInput, 'user');
    userInputElement.value = '';

    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        addMessage(botResponse, 'bot');
        showSuggestions([]); // Limpa as sugestões após enviar a mensagem
    }, 1000);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom of the chat box
}

function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();

    // Expressões regulares para reconhecer intenções específicas
    const regexPatterns = [
        { pattern: /conectar|modem|roteador|wifi/, response: 'Tente reiniciar seu modem e roteador. Procedimento completo: Desconecte o roteador e o conversor da tomada de energia. Aguarde de 5 a 10 minutos para garantir que todos os componentes eletrônicos nos dispositivos sejam desenergizados. Conecte novamente os cabos e ligue o roteador e o conversor novamente na tomada de energia. Teste e verifique como está a sua conexão.' },
        { pattern: /senha|wifi/, response: 'Certo, como você já realizou o procedimento, oriento a esquecer a senha do wifi e conectar novamente.' },
        { pattern: /oi|olá|ola|Oi|oii/, response: 'Oi sou o Suporte, Como posso auxiliar?' },
        { pattern: /tarde/, response: 'Suporte, boa tarde! Como posso auxiliar?' },
        { pattern: /noite/, response: 'Suporte, boa noite! Como posso auxiliar?' },
        { pattern: /dia/, response: 'Suporte, bom dia! Como posso auxiliar?' },
        { pattern: /lenta|velocidade/, response: 'Verifique se há muitos dispositivos conectados à sua rede. Possui quantos aparelhos conectados?' },
        { pattern: /sem internet|vermelho/, response: 'Há led vermelho nos equipamentos de internet?' },
        { pattern: /sim|procedimento|feito/, response: 'Certo, como você já realizou o procedimento, oriento a esquecer a senha do wifi e conectar novamente.' },
        { pattern: /testar velocidade|velocidade/, response: 'Você pode testar a velocidade da sua internet usando sites como Speedtest.net.' },
        { pattern: /funcionou|certo|ok/, response: 'Posso ajudar em algo mais?' },
        { pattern: /não|nada|obrigado|obrigada/, response: 'Agradeço pelo contato. Fico contente em saber que a conexão não apresentou problemas até agora. Sugiro que continue monitorando a estabilidade nos próximos dias.' },
        { pattern: /obrigad(o|a)|obg|brigado|brigada/, response: 'De nada! Estou à disposição para o que você precisar. 😊' }
    ];

    // Busca pela resposta correspondente usando regex
    for (const patternObj of regexPatterns) {
        if (userInput.match(patternObj.pattern)) {
            return patternObj.response;
        }
    }

    // Resposta padrão quando não há correspondência
    return 'Desculpe, não entendi sua pergunta. Pode reformular?';
}

function showSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; // Limpa as sugestões existentes

    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('button');
        suggestionElement.classList.add('suggestion');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', () => {
            document.getElementById('user-input').value = suggestion;
            sendMessage(); // Simula o envio da mensagem quando a sugestão é clicada
        });
        suggestionsContainer.appendChild(suggestionElement);
    });
}

// Função para iniciar o chat com uma mensagem de boas-vindas
function startChat() {
    const welcomeMessage = 'Olá! Como posso ajudar você hoje?';
    addMessage(welcomeMessage, 'bot');
}

// Inicializa o chat com a mensagem de boas-vindas
startChat();

// Inicializa as sugestões
showSuggestions([
    'Não consigo conectar',
    'Internet lenta',
    'Como testar velocidade'
]);
