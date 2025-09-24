# WhatsApp Chatbot – Ambiente Virtual de Aprendizagem (EGOV/DF)

[![Licença](https://img.shields.io/badge/Licença-Apache%202.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)

Este projeto é um **chatbot automatizado via WhatsApp** desenvolvido para apoiar servidores e cidadãos do Distrito Federal no acesso aos **cursos de Educação a Distância (EaD)** da **Escola de Governo do DF (EGOV)**. O bot oferece orientações sobre inscrições, login no AVA, horários de atendimento e suporte técnico — tudo diretamente pelo WhatsApp.

> ✨ **Objetivo**: Democratizar o acesso à formação continuada do Governo do Distrito Federal por meio de um canal familiar e acessível.

---

## 🌐 Funcionalidades

- ✅ Saudação personalizada com menu interativo  
- ✅ Orientação passo a passo para **pré-inscrição em cursos EaD**  
- ✅ Suporte a problemas de **login no Ambiente Virtual de Aprendizagem (AVA)**  
- ✅ Informações sobre **horários de atendimento**  
- ✅ Contato direto com o **suporte técnico da EGOV**  
- ✅ Envio de **mídias ilustrativas**:  
  - Imagem de exemplo  
  - Áudio (ex: mensagem de boas-vindas)  
  - GIF (ex: animação de tutorial)  
- ✅ Vídeo tutorial embutido para cadastro como **usuário externo**

---

## 📥 Links Oficiais

- **Inscrições EaD**: https://egov.df.gov.br/inscricoes-ead-2/  
- **Ambiente Virtual (AVA)**: https://egovvirtual.df.gov.br/login/index.php  
- **E-mail de suporte**: ead.egov@economia.df.gov.br

---

## 🛠️ Pré-requisitos

- **Node.js v18 ou superior**  
  → [Baixar Node.js (LTS)](https://nodejs.org/)
- **Git** (opcional, para clonar o repositório)  
  → [Baixar Git](https://git-scm.com/)
- **WhatsApp Web** funcionando em seu celular (com internet)

---

## 🚀 Instalação e Execução

1. **Clone ou baixe o repositório**
   ```bash
   git clone https://github.com/seu-usuario/whatsapp-chatbot-egov.git
   cd whatsapp-chatbot-egov
   ```

2. **Instale as dependências**
    ```bash
    npm install
    ```

3. Prepare as mídias (opcional, mas recomendado)
- Coloque as mídias na pasta:
    ```bash
    mídias/
    ```
- Adicione os arquivos compatíveis:
- mídias/exemplo.jpg (imagem)
- mídias/exemplo.ogg (áudio em OPUS)
- mídias/exemplo.gif (GIF)
- mídias/EGOV-Inscricao-Cadastro-Usuario-Externo.mp4 (vídeo tutorial em H.264 + AAC, <16MB)

4. Inicie o bot
    ```bash
    npm start
    ```

5. Escaneie o QR Code
- Um QR Code será exibido no terminal.
- Abra o WhatsApp no celular -> Configurações -> WhatsApp Web -> Escaneie o código.
- Após a conexão, o bot estará ativo!