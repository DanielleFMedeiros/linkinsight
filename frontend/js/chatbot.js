let currentStep = null; // Variável para rastrear o estado da conversa
let lastDeviceType = null; // Variável para rastrear o último tipo de dispositivo mencionado

function sendMessage() {
    const userInputElement = document.getElementById('user-input');
    const userInput = userInputElement.value.trim();
    if (!userInput) return;

    addMessage(userInput, 'user');
    userInputElement.value = '';

    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        addMessage(botResponse, 'bot');
        showSuggestions([
            'Não consigo conectar',
            'Internet lenta',
            'Como testar velocidade'
        ]); // Mostra as sugestões após enviar a mensagem
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

    const regexPatterns = [
        { pattern: /conectar|modem|roteador|wifi/, response: 'Tente reiniciar seu modem e roteador. Procedimento completo: Desconecte o roteador e o conversor da tomada de energia. Aguarde de 5 a 10 minutos para garantir que todos os componentes eletrônicos nos dispositivos sejam desenergizados. Conecte novamente os cabos e ligue o roteador e o conversor novamente na tomada de energia. Teste e verifique como está a sua conexão.' },
        { pattern: /senha|wifi/, response: 'Certo, como você já realizou o procedimento, oriento a esquecer a senha do wifi e conectar novamente.' },
        { pattern: /oi|olá|ola|Oi|oii/, response: 'Oi sou o Suporte, Como posso auxiliar?' },
        { pattern: /tarde/, response: 'Suporte, boa tarde! Como posso auxiliar?' },
        { pattern: /noite/, response: 'Suporte, boa noite! Como posso auxiliar?' },
        { pattern: /dia/, response: 'Suporte, bom dia! Como posso auxiliar?' },
        { pattern: /lenta/, response: 'Verifique se há muitos dispositivos conectados à sua rede. Quantos aparelhos estão conectados? \n1. Um dispositivo \n2. Três dispositivos ou menos \n3. Mais de 4 dispositivos', nextStep: 'checkDeviceDetails' },
        { pattern: /sem internet|vermelho/, response: 'Há led vermelho nos equipamentos de internet? 1. Sim há no roteador ou no conversor da fibra\n 2. Não \n3. Não acende nenhum LED' ,nextStep: 'checkDeviceDetailsSem' },
        { pattern: /sim|procedimento|feito/, response: 'Certo, como você já realizou o procedimento, oriento a esquecer a senha do wifi e conectar novamente.' },
        { pattern: /testar velocidade|velocidade/, response: 'Você pode testar a velocidade da sua internet usando sites como Speedtest.net.' },
        { pattern: /funcionou|certo|ok/, response: 'Posso ajudar em algo mais?' },
        { pattern: /não|nada|obrigado|obrigada/, response: 'Agradeço pelo contato. Fico contente em saber que a conexão não apresentou problemas até agora. Sugiro que continue monitorando a estabilidade nos próximos dias.' },
        { pattern: /obrigad(o|a)|obg|brigado|brigada/, response: 'De nada! Estou à disposição para o que você precisar. 😊' }
    ];

    if (currentStep) {
        if (currentStep === 'checkDeviceDetails') {
            currentStep = 'handleDeviceDetails';
            return checkDeviceDetails(userInput);
        } else if (currentStep === 'handleDeviceDetails') {
            currentStep = null; // Reset current step after handling details
            askIfUserHasMoreQuestions(); // Pergunta se o usuário tem mais dúvidas
            return handleDeviceDetails(userInput);
        }
    }

    for (const patternObj of regexPatterns) {
        if (patternObj.pattern.test(userInput)) {
            if (patternObj.nextStep) {
                currentStep = patternObj.nextStep;
                return patternObj.response;
            }
            return patternObj.response;
        }
    }

    return 'Desculpe, não entendi sua solicitação. Pode reformular sua pergunta?';
}

function checkDeviceDetails(userInput) {
    lastDeviceType = userInput; // Armazena o tipo de dispositivo para o próximo passo

    if (userInput === '1') {
        return 'Qual dispositivo seria? Se for um celular/smartphone/telefone, por favor informe a marca. Se for outro, por favor informe o tipo de dispositivo e se ele é móvel (ex: tablet) ou fixo (ex: televisão).';
    } else if (userInput === '2' || userInput === '3') {
        return 'Quais dispositivos estão conectados? Se for um celular/smartphone/telefone, por favor informe a marca de cada um.';
    } else {
        currentStep = 'checkDeviceDetails'; // Define de volta para o mesmo passo
        return 'Resposta não reconhecida. Por favor, tente novamente.';
    }
}

function handleDeviceDetails(userInput) {
    if (/lg|motorola|motorolla|motog/i.test(userInput)) {
        return 'Para dispositivos LG ou Motorola, entre em contato com a provedora para desativar o IPV6, pois pode causar conflitos. Oriente-se no site tudocelular.com para verificar a tecnologia Wi-Fi do seu aparelho. Se for AX, ele tem tecnologia Wi-Fi 6; se for AC, pega a rede 5G (maior velocidade e menor distância); se for apenas B/G/N, funciona apenas na rede 2.4GHz (maior distância e menor velocidade). Sugiro pedir ao suporte do provedor que desative o AX das redes e troque a criptografia para WPA2 PSK.';
    } else if (/samsung|iphone|ios|android|xiaomi|galaxy/i.test(userInput)) {
        return 'Oriente-se no site tudocelular.com para verificar a tecnologia Wi-Fi do seu aparelho. Se for AX, ele tem tecnologia Wi-Fi 6; se for AC, pega a rede 5G (maior velocidade e menor distância); se for apenas B/G/N, funciona apenas na rede 2.4GHz (maior distância e menor velocidade). Sugiro pedir ao suporte do provedor que desative o AX das redes e troque a criptografia para WPA2 PSK.';
    } else if (/celular|smartphone|telefone/i.test(lastDeviceType)) {
        return 'Oriente-se no site tudocelular.com para verificar a tecnologia Wi-Fi do seu aparelho. Se for AX, ele tem tecnologia Wi-Fi 6; se for AC, pega a rede 5G (maior velocidade e menor distância); se for apenas B/G/N, funciona apenas na rede 2.4GHz (maior distância e menor velocidade). Sugiro pedir ao suporte do provedor que desative o AX das redes e troque a criptografia para WPA2 PSK.';
    } else if (/notebook/i.test(lastDeviceType)) {
        return 'Seu notebook está conectado por cabo ou Wi-Fi? Se por cabo, siga este procedimento para verificar se o cabo de rede é gigabit ou fast: Configurações de Ethernet. Vá até Configurações de Ethernet, clique em 🖥️, vá até o final da página em Propriedades e verifique a velocidade da conexão (recepção/transmissão). Se estiver 1000/1000 (Mbps), é gigabit. Caso esteja 100, é fast, e não alcançará os 400MB contratados. Vá em Painel de Controle > Rede e Internet > Conexões de rede. Botão direito no ícone -> Propriedades -> Configurar -> Avançado -> Velocidade e Duplex -> Altere para 1 Gbps full duplex. Se conectar por Wi-Fi, aproxime-se do roteador e conecte-se à rede 5G. Se não aparecer, a placa de rede é /100, fast. Recomendo sempre conectar por cabo de rede!';
    } else if (/televisão|tv/i.test(lastDeviceType)) {
        return 'Sua TV está conectada por cabo ou Wi-Fi? Se por Wi-Fi, ela está perto ou longe do roteador? Oriente a conectar na 5G se estiver próxima do roteador. Caso contrário, oriente a conectar por cabo de rede. É uma TV SMART e possui algum IPTV / TV BOX conectado? Se for uma TV Smart, teste se ocorre travamento no YouTube. Se não travar, não é problema de internet. Verifique com o fornecedor do IPTV/TV Box, que deve ter um número de suporte se for homologado pela Anatel. Note que muitos desses aparelhos podem ter instabilidades, interferências e falta de segurança. Certifique-se de que seu aparelho é certificado pela Anatel e conecte-o por cabo para maior estabilidade e rapidez.';
    } else {
        currentStep = 'handleDeviceDetails'; // Define de volta para o mesmo passo
        return 'Informe o tipo de dispositivo e se ele é móvel (ex: tablet) ou fixo (ex: televisão).';
    }
}

function askIfUserHasMoreQuestions() {
    setTimeout(() => {
        addMessage('Você tem mais alguma dúvida?', 'bot');
    }, 1000);
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

// Função para reiniciar o chat
function resetChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Limpa todas as mensagens do chat

    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; // Limpa as sugestões

    startChat(); // Reinicia o chat com a mensagem inicial e sugestões
}

function startChat() {
    const welcomeMessage = 'Olá! Como posso ajudar você hoje?';
    addMessage(welcomeMessage, 'bot');
    showSuggestions([
        'Não consigo conectar',
        'Internet lenta',
        'Como testar velocidade',
    ]); // Mostra as sugestões iniciais
}


// Inicializa o chat com as mensagens de boas-vindas e sugestões iniciais
startChat();
