// Importa as dependências
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

// Inicializa o cliente com autenticação persistente
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'whatsapp-chatbot',
        dataPath: './sessions'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]
    }
});

// Mostra o QR Code no terminal
client.on('qr', (qr) => {
    console.log('🔸 Escaneie o QR Code abaixo para conectar o WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Confirma quando o bot está pronto
client.on('ready', () => {
    console.log('✅ WhatsApp conectado! Bot está ativo e pronto para atender.');
});

// Eventos de depuração (opcional, mas útil)
client.on('auth_failure', (msg) => {
    console.log('❌ Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
    console.log('🔴 Desconectado:', reason);
});

// Inicializa o cliente
client.initialize();

// Função para simular digitação
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Regex para saudações comuns
const saudacoesRegex = /^(oi|olá?|ola|eae|e aí|e ai|bom dia|boa tarde|boa noite|tudo bem\??|hey|hello|hi|salve|opa|fala|fala aí|falae|oie)$/i;

// Normaliza texto: remove acentos e converte para minúsculas
const normalizeText = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

// Evento principal: ao receber uma mensagem
client.on('message', async (msg) => {
    if (msg.fromMe) return;

    const chat = await msg.getChat();
    const from = msg.from;
    const body = msg.body?.trim();
    const normalizedBody = normalizeText(body || '');

    // Apenas responde contatos individuais
    if (!from.endsWith('@c.us')) return;

    // Simula digitação
    await delay(1000);
    await chat.sendStateTyping();
    await delay(1000);

    try {
        // SAUDAÇÃO INICIAL
        if (body && body.match(saudacoesRegex)) {
            const contact = await msg.getContact();
            const name = contact.pushname || contact.notifyName || "usuário";

            await client.sendMessage(
                from,
                `Olá! ${name.split(" ")[0]}, seja bem-vindo(a) ao atendimento do *Ambiente Virtual de Aprendizagem - EAD EGOV/DF*.\n\n` +
                `Digite o número do serviço desejado:\n\n` +
                `1️⃣ - Quero me inscrever em um curso\n` +
                `2️⃣ - Problema com login no AVA\n` +
                `3️⃣ - Horários de atendimento\n` +
                `4️⃣ - Falar com o suporte\n` +
                `5️⃣ - Exemplo de imagem\n` +
                `6️⃣ - Exemplo de gravação de áudio\n` +
                `7️⃣ - Exemplo de GIF\n\n` +
                `Digite *menu* a qualquer momento para voltar.`
            );
            return;
        }

        // MENU PRINCIPAL
        if (normalizedBody === 'menu') {
            await client.sendMessage(
                from,
                `🔄 Você voltou ao menu principal!\n\n` +
                `1️⃣ - Quero me inscrever em um curso\n` +
                `2️⃣ - Problema com login no AVA\n` +
                `3️⃣ - Horários de atendimento\n` +
                `4️⃣ - Falar com o suporte\n` +
                `5️⃣ - Exemplo de imagem\n` +
                `6️⃣ - Exemplo de gravação de áudio\n` +
                `7️⃣ - Exemplo de GIF`
            );
            return;
        }

        // OPÇÃO 1 - INSCRIÇÃO
        if (normalizedBody === '1') {
            await client.sendMessage(
                from,
                `📌 Para se inscrever em um curso EAD:\n\n` +
                `1. Acesse: https://egov.df.gov.br/inscricoes-ead-2/\n` +
                `2. Clique em "*Quero me inscrever no curso...*"\n` +
                `3. Faça login com sua conta gov.br (recomendado)\n` +
                `4. Clique em *Pré-inscrição*\n\n` +
                `⚠️ Servidores de PCDF, PMDF, CLDF, TCDF, CAESB, CEB, BRB, IGES, CEASA, CBMDF, EMATER, DPDF e TERRACAP devem se cadastrar como *usuário externo*.\n\n` +
                `Digite *vídeo tutorial* para assistir ao passo a passo.\n\n` +
                `Dúvidas? Digite *contato* para obter ajuda.`
            );
            return;
        }

        // OPÇÃO 2 - PROBLEMAS COM LOGIN
        if (normalizedBody === '2') {
            await client.sendMessage(
                from,
                `🔐 Problemas com login no Ambiente Virtual?\n\n` +
                `Acesse: https://egovvirtual.df.gov.br/login/index.php\n\n` +
                `Opções disponíveis:\n` +
                `• 🔑 Acessar com cpf e senha\n` +
                `• ❓ Esqueci a senha\n` +
                `• 🆔 Recuperar por usuário\n` +
                `• 📧 Recuperar por e-mail\n\n` +
                `Se o problema persistir, digite *contato* para suporte.`
            );
            return;
        }

        // OPÇÃO 3 - HORÁRIOS DE ATENDIMENTO
        if (normalizedBody === '3') {
            await client.sendMessage(
                from,
                `⏰ *Horários de Atendimento:*\n\n` +
                `📅 Segunda a Sexta\n` +
                `🕘 08h00 às 12h00\n` +
                `🕓 13h00 às 17h00\n\n` +
                `🚫 Sábados, domingos e feriados: sem atendimento.`
            );
            return;
        }

        // OPÇÃO 4 - CONTATO COM SUPORTE
        if (normalizedBody === '4' || normalizedBody === 'contato') {
            await client.sendMessage(
                from,
                `📩 *Suporte Técnico EAD EGOV/DF*\n\n` +
                `☎️ Telefone: (61) 3344-0096\n` +
                `📧 E-mail: ead.egov@economia.df.gov.br\n\n` +
                `⏰ Atendimento: Segunda a sexta, das 8h às 17h.\n\n` +
                `Descreva seu problema por e-mail e em breve responderemos.\n\n` +
                `Digite *menu* para voltar ao início.`
            );
            return;
        }

        // OPÇÃO 5 - EXEMPLO DE IMAGEM
        if (normalizedBody === '5') {
            const imagePath = path.resolve(__dirname, 'mídias', 'exemplo.jpg');
            if (!fs.existsSync(imagePath)) {
                await client.sendMessage(from, '⚠️ Imagem não encontrada. Verifique a pasta "mídias/exemplo.jpg"');
                return;
            }
            const imageBuffer = fs.readFileSync(imagePath);
            const media = new MessageMedia('image/jpeg', imageBuffer.toString('base64'), 'exemplo.jpg');
            await client.sendMessage(from, media, { caption: '🖼️ *Exemplo de imagem enviada!*' });
            return;
        }

        // OPÇÃO 6 - EXEMPLO DE ÁUDIO
        if (normalizedBody === '6') {
            const audioPath = path.resolve(__dirname, 'mídias', 'exemplo-voz.mp3');
            if (!fs.existsSync(audioPath)) {
                await client.sendMessage(from, '⚠️ Áudio não encontrado. Verifique a pasta "mídias/exemplo-voz.mp3"');
                return;
            }
            const audioBuffer = fs.readFileSync(audioPath);
            const media = new MessageMedia('áudio/mp3', audioBuffer.toString('base64'), 'exemplo-voz.mp3');
            await client.sendMessage(from, media, { sendAudioAsVoice: true, caption: '🔊 *Exemplo de áudio!*' });
            return;
        }

        // OPÇÃO 7 - EXEMPLO DE GIF
        if (normalizedBody === '7') {
            const gifPath = path.resolve(__dirname, 'mídias', 'exemplo.gif');
            if (!fs.existsSync(gifPath)) {
                await client.sendMessage(from, '⚠️ GIF não encontrado. Verifique a pasta "mídias/exemplo.gif"');
                return;
            }
            const gifBuffer = fs.readFileSync(gifPath);
            const media = new MessageMedia('vídeo/gif', gifBuffer.toString('base64'), 'exemplo.gif');
            await client.sendMessage(from, media, { caption: '🔄 *GIF animado de exemplo!*' });
            return;
        }

        // OPÇÃO: VÍDEO TUTORIAL
        if (normalizedBody === 'video tutorial') {
            const videoPath = path.resolve(__dirname, 'mídias', 'EGOV-Inscricao-Cadastro-Usuario-Externo.mp4');
            if (!fs.existsSync(videoPath)) {
                return await client.sendMessage(from, '⚠️ Arquivo não encontrado. Contate o suporte.');
            }
            const fileSizeMB = fs.statSync(videoPath).size / 1024 / 1024;
            if (fileSizeMB > 16) {
                return await client.sendMessage(from, '⚠️ Vídeo muito grande. Máx: 16MB.');
            }
            try {
                const buffer = fs.readFileSync(videoPath);
                const media = new MessageMedia('vídeo/mp4', buffer.toString('base64'), 'tutorial-cadastro.mp4');
                await client.sendMessage(from, media, {
                    sendVideoAsDocument: false,
                    caption: '🎥 *Vídeo Tutorial: Cadastro como Usuário Externo*\n\n' +
                             'Digite *menu* para voltar.'
                });
            } catch (err) {
                console.error('❌ Falha ao enviar vídeo:', err);
                await client.sendMessage(from, '⚠️ Falha ao enviar vídeo. Tente novamente mais tarde.');
            }
            return;
        }

        // MENSAGEM DESCONHECIDA
        if (body) {
            await client.sendMessage(
                from,
                `❌ Desculpe, não entendi sua mensagem.\n\n` +
                `Digite *menu* para ver as opções ou *contato* para falar com o suporte.`
            );
        }

    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error.message);
        try {
            await client.sendMessage(from, '⚠️ Ocorreu um erro. Tente novamente mais tarde.');
        } catch (sendError) {
            console.error('❌ Falha ao enviar mensagem de erro:', sendError.message);
        }
    }
});