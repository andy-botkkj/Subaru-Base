# 🤖 Subaru-BOT

Um bot para WhatsApp baseado em *Baileys*, com foco em automação de grupos, brincadeiras, sistemas de anti-mídia, jogos, figurinhas, inteligência artificial e muito mais.


## ✨ Funcionalidades

- 🎵 *Música & Mídia*
  - Play de áudio/vídeo
  - Downloads de YouTube, TikTok, Instagram, Facebook, Twitter
  - Conversão para áudio ou documento

- 🛡️ *Sistema Anti*
  - Antilink
  - Anti-imagem
  - Anti-vídeo
  - Anti-figurinhas
  - Anti-documento
  - Anti-contato
  - Anti-localização
  - BanChat automático

- 🎮 *Jogos*
  - Jogo da velha
  - Pedra, papel e tesoura
  - Sistema NoFap (patentes motivacionais)

- 🎭 *Brincadeiras*
  - `chance`, `comer`, `capinarlote`, `pgpeito`, `pgbunda`, `sentar`, etc.
  - Respostas interativas e vídeos engraçados
  - Ranking de “gado”, “gay”, “corno”, etc.

- 📝 *Utilidades*
  - Conversão de mídia em figurinhas
  - Sistema de contagem de mensagens (`minhaatividade`)
  - Bem-vindo automático
  - IA estilo SimSimi (via API Raikken)
  - Menu interativo com botões


## 🚀 Instalação

1. Baixei o bot, disponível em: https://mega.nz/file/3DxTWBqA#sAYDC5Xvy-oYMuXYAAdIUi1iBiArTSScpG-vuJ0dOvc

2. Instale as dependências (se necessário)
npm install

3. Configure
Edite o arquivo ./configs/settings.json:

{
  "prefix": "!",
  "botName": "Subaru-BOT",
  "donoName": "Seu Nome",
  "donoNmr": "5512999999999",
  "RaikkenKey": "SUA_API_KEY",
  "baseRaikken": "https://raikken-api.speedhosting.cloud"
}

- No momento, essa base está com a Key "raikken", que por enquanto está ativa é gratuita, mas é provável que bem em breve vai ser consumida rápida, então procure comprar uma nova comigo diretamente: wa.me/559292678251

▶️ Uso
Inicie o bot com uma das opções:

- npm start (código pairing)
- node conection.js (código QR)
- node conection.js --code (Código pairing)
- sh start.sh (ambos, escolha o melhor) *RECOMENDADO*

No WhatsApp, use comandos com prefixo definido no settings.json.
Exemplos:

!menu → Mostra o menu
!sticker → Cria figurinha de imagem ou vídeo
!jogodavelha @membro → Inicia jogo da velha
!minhaatividade → Mostra suas estatísticas no grupo
!play → toca música
!tinder → funções de Tinder

##O bot conta com botões e não dá para desativar

⚡ Deploy
Pode ser hospedado em:
Termux
Pterodactyl
VPS/Linux
Heroku (requer ajustes)


👤 Créditos

Base feita em Baileys
Criado por Sz
Integração IA: Raikken API


📜 Licença

Distribuído sob licença MIT.
Sinta-se livre para modificar e usar.


💀 Considerações, By Sz

Pra ser bem sincero, nem tava nos meus planos escrever esse texto aqui, mas acho que seria injusto não registrar umas coisas importantes. Então, bora lá.
Primeiro, quero agradecer de coração aos meus parceiros Spiral, Reis, Creeper, Thzy, Riki e Duarte, que foram testando a base/bot, dando feedback e ajudando a decidir qual caminho dava o melhor resultado. De verdade, vocês fizeram a diferença!
Também não posso deixar de citar o Anguish, porque foi do bot dele que veio a ideia do multi menu que implementei aqui. Valeu demais por essa inspiração e contribuição indireta.
A todos que ficaram esperando esse arquivo (se realmente teve alguém) muito obrigado! 
E olha, se você realmente tá lendo isso aqui até o final… pô, muito obrigado mesmo! 😂 Tamo junto, e se curtir o projeto, dá aquela força e segue o canal kkkkk.

Com isso, já irei trabalhar para o meu próximo trampo e disponibilizar esse arquivo no Github. 
