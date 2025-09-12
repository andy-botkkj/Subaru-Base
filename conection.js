/*
* Oi, se tá lendo isso, é porque tem interesse no bot. Muito obrigado! 
* Esse bot é gratuito, se pagou por ele, exija seu dinheiro de volta.
* Achou o bot legal ou tá pensando em kibar algo? Pelo menos segue o meu canal, kk
* Raikken-API: https://whatsapp.com/channel/0029VbB75r1HFxOvPXYp7Z10
*/

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, isJidBroadcast,isJidStatusBroadcast, makeInMemoryStore,getContentType } = require("baileys");
const fs = require('fs')
const pino = require("pino");
const chalk = require('chalk')
const path= require('path')
const readline = require("readline");
const { escolherPersonalidadeSubaru, escolherVideoPorRota, getFileBuffer, checkPrefix, fetchJson, getBuffer, data, hora } = require('./dono/functions.js')

const { handleCmds } = require("./index.js");
let fotoperfil = fs.readFileSync("./database/imgs/perfil.jpeg");
const { prefix, botName, donoName, donoNmr } = require('./configs/settings.json');

const groupMetadataCache = new Map();
async function getGroupMetadataSafe(groupId) {
if (groupMetadataCache.has(groupId)) {
return groupMetadataCache.get(groupId);
}
}

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

const startConnection = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("./configs/session");
  const { version } = await fetchLatestBaileysVersion();
  const isJidNewsletter = (jid) => jid?.endsWith("@newsletter");

  const subaru = makeWASocket({
    version,
    logger: pino({ level: "error" }),
    printQRInTerminal: !process.argv.includes("--code"),
    auth: state,
    markOnlineOnConnect: false,
    syncFullHistory: false,
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    getMessage: async (key) => {
      const msg = await store.loadMessage(key.remoteJid, key.id);
      return msg?.message || undefined;
    },
  });

  store.bind(subaru.ev);
  if (process.argv.includes("--code") && !subaru.authState.creds.registered) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const question = (text) => new Promise((resolve) => rl.question(text, resolve));
    let phoneNumber = await question("Insira o número de telefone para conectar: ")
    phoneNumber = phoneNumber.replace(/\D/g, "");
    const code = await subaru.requestPairingCode(phoneNumber);
    console.log(`Seu código de pareamento: ${code?.match(/.{1,4}/g)?.join("-") || code}`)
    rl.close();
  }

  subaru.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log(`Conexão fechada. Motivo: ${lastDisconnect.error?.output?.statusCode}.`),
        console.log(`Reconectando: ${shouldReconnect}`)
      if (shouldReconnect) {
        startConnection();
      }
    } else if (connection === "open") {
      subaru.updateProfilePicture(subaru.user.id, fotoperfil);
      subaru.sendMessage(`${donoNmr}@s.whatsapp.net`, {text: `Eu sou Subaru! Não tenho muito para dizer!`})
      console.log(chalk.blueBright("\nSubaru-Bot ativo!\n"));
    }
  });

  subaru.ev.on("creds.update", saveCreds);

  subaru.ev.on("messages.upsert", async ({ messages, type }) => {
    const msg = messages[0];
    
    try {
    if (type !== "notify" || !msg.message || msg.key.fromMe || msg.key.remoteJid === "status@broadcast") {return; }
    if (!msg.message) {return; }
    const info = msg 
    var body = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || info?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.imageMessage?.caption || info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || JSON.parse(info.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}')?.id || 
   info?.text || '';
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith("@g.us");
    const isCmd = body.startsWith(prefix);
    const sender = msg.key.participant || msg.key.remoteJid;
    const pushname = msg.pushName || "Usuário";
    const groupMetadata = isGroup ? await subaru.groupMetadata(from) : {};
    const groupName = isGroup ? groupMetadata.subject : "Conversa Privada";
    const cmd = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : null;
    const hora = new Date().toLocaleTimeString("pt-BR");
    let comando = cmd         
// 🔘 Botão tipo Native Flow (paramsJson)
    if (msg.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson) {
        try {
            const json = JSON.parse(msg.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson);
            let  comando = json.selectedRowId;
        } catch (e) {
        console.error("Erro ao parsear paramsJson:", e);
        }}
// Botão simples
    if (!comando && msg.message?.buttonsResponseMessage?.selectedButtonId) {
  comando = msg.message.buttonsResponseMessage.selectedButtonId; }
// Lista
    if (!comando && msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId) {
  comando = msg.message.listResponseMessage.singleSelectReply.selectedRowId; }   
     
   await handleCmds(subaru, msg); 
   
    const logLine = "═".repeat(40);
    const chalk = require("chalk")
       if (cmd) {
        console.log(
        chalk.blueBright("\n╔══════╌✯╌═⊱×⊰ 𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞 ⊰×⊰═╌✯╌══════╗") + "\n" +
        chalk.blueBright("║★ ") + chalk.white.bold("[ COMANDO DETECTADO ]") + "\n" +
        chalk.blueBright("║") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Tipo: ") + chalk.greenBright(isGroup ? "Grupo" : "Privado") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Grupo: ") + chalk.yellowBright(groupName || "-") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Usuário: ") + chalk.yellowBright(`${pushname} (${sender.split("@")[0]})`) + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Comando: ") + chalk.greenBright(cmd) + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Horário: ") + chalk.gray(hora) + "\n" +
        chalk.blueBright("╚══════╌✯╌═⊱×⊰ 𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞 ⊰×⊰═╌✯╌══════╝\n"))
       } else if (body) {
        console.log(
        chalk.blueBright("\n╔══════╌✯╌═⊱×⊰ 𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞 ⊰×⊰═╌✯╌══════╗") + "\n" +
        chalk.blueBright("║★ ") + chalk.white.bold("[ MENSAGEM RECEBIDA ]") + "\n" +
        chalk.blueBright("║") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Tipo: ") + chalk.greenBright(isGroup ? "Grupo" : "Privado") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Grupo: ") + chalk.yellowBright(groupName || "-") + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Usuário: ") + chalk.yellowBright(`${pushname} (${sender.split("@")[0]})`) + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Mensagem: ") + chalk.greenBright(body) + "\n" +
        chalk.blueBright("║★ ") + chalk.cyan("Horário: ") + chalk.gray(hora) + "\n" +
        chalk.blueBright("╚══════╌✯╌═⊱×⊰ 𝐒𝐮𝐛𝐚𝐫𝐮-𝐁𝐚𝐬𝐞 ⊰×⊰═╌✯╌══════╝\n"))}
    } catch (err) {
        if (String(err).includes('SenderKeyRecord') || String(err).includes('decrypt')) {
            console.log('⚠️ Mensagem não pôde ser decriptada (sem chave SenderKey), ignorando...');
            return;
        }
        console.error('Erro inesperado:', err);
    }
  });

  subaru.ev.on("group-participants.update", async (update) => {
    const { id, action, participants } = update;
    const groupSettingsPath = `./database/grupos/${id}.json`;
    const thumbnailPath = path.join(__dirname, 'database', 'imgs', 'perfil.jpeg');
    const well = fs.readFileSync(thumbnailPath);
    if (!fs.existsSync(groupSettingsPath)) return;
    try {
      const groupSettings = JSON.parse(fs.readFileSync(groupSettingsPath));
      const welcomeConfig = groupSettings[0]?.bemVindo?.[0];
      if (!welcomeConfig?.ativo) return;
      const groupMetadata = await subaru.groupMetadata(id);
      const groupName = groupMetadata.subject;
      const member = participants[0];
      let textinh = "";
      if (action === "add" && welcomeConfig.entrou) {
        textinh = welcomeConfig.entrou
          .replace("%numero%", member.split("@")[0])
          .replace("%nomeGrupo%", groupName);
      } else if (action === "remove" && welcomeConfig.saiu) {
        textinh = welcomeConfig.saiu
          .replace("%numero%", member.split("@")[0])
          .replace("%nomeGrupo%", groupName);
      } 
      if (textinh) {
        await subaru.sendMessage(id, {text: textinh, mentions: [member], 
         contextInfo: { externalAdReply: {
         title: `Meu prefixo: ${prefix}`,
         body: '',
         thumbnailUrl: well,
         mediaType: 1,
         mediaUrl: 'https://raikken-api.speedhosting.cloud/',
         sourceUrl: 'https://raikken-api.speedhosting.cloud/'}}});
      }} catch (e) {
      console.error(`Erro no evento 'group-participants.update' para o grupo ${id}:`, e);
      if (e?.data === 403) {
          console.log(`Bot foi removido do grupo ${id}. Excluindo arquivo de configuração.`)
          fs.unlinkSync(groupSettingsPath);
      }
    }
  });

  return subaru;
};

fs.watchFile(__filename, () => {
  console.log(`Arquivo '${__filename}' foi modificado. Reiniciando...`);
  process.exit();
});

startConnection().catch((err) => console.error("Erro fatal ao iniciar a conexão:", err));