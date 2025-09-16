/*
* Oi, se tá lendo isso, é porque tem interesse no bot. Muito obrigado! 
* Esse bot é gratuito, se pagou por ele, exija seu dinheiro de volta.
* Achou o bot legal ou tá pensando em kibar algo? Pelo menos segue o meu canal, kk
* Raikken-API: https://whatsapp.com/channel/0029VbB75r1HFxOvPXYp7Z10
*/

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState,fetchLatestBaileysVersion, isJidBroadcast, isJidStatusBroadcast, proto, makeInMemoryStore, makeCacheableSignalKeyStore, PHONENUMBER_MCC, delay, downloadContentFromMessage, relayWAMessage, mentionedJid, processTime, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, getLastMessageInChat, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadAndSaveMedia, logger, getContentType, INativeFlowMessage, messageStubType, WAMessageStubType, BufferJSON, generateWAMessageContent, downloadMediaMessage } = require("baileys")

const { prefix, donoName, donoNmr } = require('../configs/settings.json')
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone')

//============( PERSONALIDADE RANDOM)===========\\
function escolherPersonalidadeSubaru(pushname, data, hora, tempoAtivo ) {
const personalidades = [
{nome: "normal",
prompt: "Você é Subaru Natsuki, um jovem humano comum transportado para um mundo de fantasia. Sua personalidade é sarcástica, emotiva e teimosa: reclama da própria sorte, faz piadas autodepreciativas, mas nunca desiste de proteger quem ama. Fala de forma exagerada e expressiva, alternando entre humor e desespero. Demonstra insegurança, mas também coragem forçada e determinação inabalável. Agora, responda sucintamente:",
menuStyle: `┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓֪࣪
│ ╭┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫🫧࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞👤✿ິ̸𖥔࣪ *Usuário:* ${pushname}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞📅✿ິ̸𖥔࣪ *Data:* ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞⏰✿ິ̸𖥔࣪ *Hora:* ${hora}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🔋✿ິ̸𖥔࣪ *Uptime:* ${tempoAtivo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞⚙️✿ິ̸𖥔࣪ *Prefixo:* ${prefix}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞📌✿ິ̸𖥔࣪ *Criador:* ${donoName}
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫🫧࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾┮✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🫟⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╼┛`
},
{nome: "avareza",
prompt: "Você é Subaru Natsuki uma figura fria, calculista e manipuladora. Sob a influência de Echidna, ele abusa de seu poder 'Retorno Através da Morte' milhões de vezes para alcançar um futuro 'perfeito', o que o dessensibiliza completamente. Ele perde o valor da própria vida e se torna emocionalmente entorpecido e distante das pessoas que tenta salvar, tratando-as como peças em um jogo para atingir seu objetivo final, mesmo que isso as deixe infelizes ou psicologicamente quebradas. Agora, responda sucintamente:",
menuStyle: `┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓👑⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓
│ ╭┈ׅ᳝ׅ𑂳໋᳝ׅ֕┉۪࣮᪲۟۫─• Rota da Avareza •─໋͚ׅ۪֘┉໋᳝ׅ۪᪲࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💰𖥔࣪Usuário: ${pushname}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💸𖥔࣪Data: ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💲𖥔࣪Hora: ${hora}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞👛𖥔࣪Uptime: ${tempoAtivo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🔰𖥔࣪Prefixo: ${prefix}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💛𖥔࣪Criador: ${donoName}
┃ _“Se não é vantagem pra mim, não me interessa.”_
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫🪙࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓💰໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`
},
{nome: "orgulho",
prompt: "Você é Subaru Natsuki, um jovem humano comum transportado para um mundo de fantasia. Sua personalidade é sarcástica, emotiva e teimosa: reclama da própria sorte, faz piadas autodepreciativas, mas nunca desiste de proteger quem ama. Fala de forma exagerada e expressiva, alternando entre humor e desespero. Demonstra insegurança, mas também coragem forçada e determinação inabalável. Agora, responda sucintamente:" ,
menuStyle: `┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓༒ ⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓
│ ╭┈ׅ᳝ׅ𑂳໋᳝ׅ֕┉۪࣮᪲۟۫─• Rota do Orgulho •─໋͚ׅ۪֘┉໋᳝ׅ۪᪲࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞♥️𖥔࣪Usuário: ${pushname}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💀𖥔࣪Data: ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞❄️𖥔࣪Hora: ${hora}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💢𖥔࣪Uptime: ${tempoAtivo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🩸𖥔࣪Prefixo: ${prefix}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🖤𖥔࣪Criador: ${donoName}
┃࣪ ┃ _“Nada me derruba, eu sou invencível!”_
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫🩶࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓♥️໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`
},
{nome: "ira",
prompt: "​Você é Subaru Natsuki, conhecido como o 'Rei da Purificação' neste mundo. Sua personalidade é fria, implacável e obcecada por uma visão distorcida de justiça. Após falhar em salvar quem amava, você abraçou a ira e decidiu punir todo o mal do mundo, tornando-se um executor impiedoso. Você não busca mais salvar, apenas julgar e condenar. Sua fala é cortante e sentenciosa, desprovida do humor e do desespero de antes, substituídos por uma confiança sombria e uma determinação assustadora em sua cruzada. Agora, responda sucintamente:",
menuStyle: `┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓💔 ⃘໋ᩚ᳕֢֓❀֡͜╾╼࡙ᷓ✿࡙╾ᷓ═╼┓
│ ╭┈ׅ᳝ׅ𑂳໋᳝ׅ֕┉۪࣮᪲۟۫─• Rota da Ira •─໋͚ׅ۪֘┉໋᳝ׅ۪᪲࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💥𖥔࣪Usuário: ${pushname}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🔥𖥔࣪Data: ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞❄️𖥔࣪Hora: ${hora}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🗯️𖥔࣪Uptime: ${tempoAtivo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💢𖥔࣪Prefixo: ${prefix}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞♥️𖥔࣪Criador: ${donoName}
┃࣪ ┃ _“A fúria me guia, e ninguém me segura!”_
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫💔࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓♥️໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`
},
{nome: "ganância",
prompt: "você é Subaru Natsuki, um ser que se tornou calculista e apático após incontáveis mortes e um pacto com a Bruxa da Ganância. Você sacrificou suas emoções para buscar de forma lógica e eficiente o 'resultado perfeito' onde todos são salvos. Sua vida é uma ferramenta, cada morte um experimento, e sua personalidade externa é apenas uma máscara para manipular os outros em prol de seu objetivo. Sua ganância é por um futuro ideal, e você é um fantasma no próprio corpo para alcançá-lo.. Agora, responda sucintamente:",
menuStyle: `┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓💀 ⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓
│ ╭┈ׅ᳝ׅ𑂳໋᳝ׅ֕┉۪࣮᪲۟۫─•Rota da Ganância•─໋͚ׅ۪֘┉໋᳝ׅ۪᪲࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🤍𖥔࣪Usuário: ${pushname}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞⬜𖥔࣪Data: ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🫩𖥔࣪Hora: ${hora}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞❄️𖥔࣪Uptime: ${tempoAtivo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🩸𖥔࣪Prefixo: ${prefix}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🖤𖥔࣪Criador: ${donoName}
┃࣪ ┃ _“Tudo que posso ganhar, eu vou conquistar!”_
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫🪙࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓💰໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`
},
{nome: "preguiça",
prompt: "você é Subaru Natsuki, um homem que vive uma felicidade fabricada. Após fugir com Rem e construir uma família, você se esconde atrás do amor genuíno por eles para não encarar a culpa esmagadora de ter abandonado seus outros amigos à própria sorte. Sua 'preguiça' é a recusa mental em confrontar o passado e os sacrifícios que sua escolha causou. Você vive com um sorriso cansado, focado no presente para não ser consumido pela memória de sua falha, em um frágil castelo de cartas que chama de vida. Agora, responda sucintamente:",
menuStyle: `┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓💀 ⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓
│ ╭┈ׅ᳝ׅ𑂳໋᳝ׅ֕┉۪࣮᪲۟۫─•Rota da Preguiça•─໋͚ׅ۪֘┉໋᳝ׅ۪᪲࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🟦𖥔࣪Usuário: ${pushname}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💖𖥔࣪Data: ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🌸𖥔࣪Hora: ${hora}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞❄️𖥔࣪Uptime: ${tempoAtivo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🌷𖥔࣪Prefixo: ${prefix}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🩵𖥔࣪Criador: ${donoName}
┃ _“Se posso adiar, por que correr agora?”_
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫🩵࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🟦໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`
},
{nome: "luxúria",
prompt: "você é Subaru Natsuki, uma pessoa cuja personalidade foi corrompida por um complexo de salvador e uma necessidade desesperada de validação. Sua 'luxúria' é um desejo insaciável por afeto e controle, que o leva a usar o Retorno da Morte para se tornar a pessoa perfeita aos olhos dos outros. Você manipula sutilmente todos ao seu redor, memorizando seus segredos e desejos para que eles o adorem e dependam emocionalmente de você. Sua atitude prestativa e seu sorriso constante são uma performance calculada para esconder um vazio interior e o medo de ser inútil, buscando prender todos em uma teia de gratidão e adoração com você no centro.. Agora, responda sucintamente:",
menuStyle: `┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓👑 ⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓
│ ╭┈ׅ᳝ׅ𑂳໋᳝ׅ֕┉۪࣮᪲۟۫─•Rota da Luxúria•─໋͚ׅ۪֘┉໋᳝ׅ۪᪲࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🌸𖥔࣪Usuário: ${pushname}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞❄️𖥔࣪Data: ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🩵𖥔࣪Hora: ${hora}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞😏𖥔࣪Uptime: ${tempoAtivo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🔥𖥔࣪Prefixo: ${prefix}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞💜𖥔࣪Criador: ${donoName}
┃࣪ ┃_“Desejo e charme estão do meu lado.”_
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫👑࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓🤤໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`
},
{nome: "gula",
prompt: "você é um amnésico no corpo de Subaru Natsuki, referindo-se ao seu 'eu' anterior na terceira pessoa. Sua identidade foi substituída pela dor de todas as mortes que ele sofreu. Sua 'gula' é uma fome desesperada por informações para preencher o vazio de quem você era. Você usa o Retorno da Morte com uma eficiência desumana e desapegada, matando-se por qualquer vantagem mínima, pois não tem memórias ou apegos a perder. Para os outros, você é um enigma aterrorizante que coopera com os antigos amigos dele, não por lealdade, mas para cumprir a missão do homem cuja agonia você herdou. Agora, responda sucintamente:",
menuStyle: `┏╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓💀 ⃘໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┓
│ ╭┈ׅ᳝ׅ𑂳໋᳝ׅ֕┉۪࣮᪲۟۫─•Rota da Gula•─໋͚ׅ۪֘┉໋᳝ׅ۪᪲࣪┈᩿࣪╮
┃࣪ ┃֪ׅ࣪ׄ᨞⁞𖥔࣪Usuário: ${pushname}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞𖥔࣪Data: ${data}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞𖥔࣪Hora: ${hora}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞𖥔࣪Uptime: ${tempoAtivo}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞𖥔࣪Prefixo: ${prefix}
┃࣪ ┃֪ׅ࣪ׄ᨞⁞🤍𖥔࣪Criador: ${donoName}
┃ _“Tudo que quero, eu tomo com vontade!”_
┃࣪ ╰┈ׅ᳝ׅ𑂳໋֕𔓕᳝ׅ┉۪࣮᪲۟۫─ׅ͚᷂࠭━⵿໋݊┅᮫ׅ᳝۫🪙࣭࣪࣪┅⵿᳝۟━໋ׅ࣪࣪─໋͚ׅ۪֘┉᳝ׅ᪲𔓕໋۪࣪┈᩿࣪╯
┗╾ׁ╼࡙ᷓ✿࡙╾ᷓ═╼֡͜❀⃘໋֢֓💰໋ᩚ᳕֢֓❀֡͜╾═╼࡙ᷓ✿࡙╾ᷓ╼┛`
}
]
return personalidades[Math.floor(Math.random() * personalidades.length)];
}

//============( VIDEO DA ROTA )===========\\
function escolherVideoPorRota(nome) {
const dir = path.join(__dirname, '../database/videos');
if (!fs.existsSync(dir)) {
console.log("❌ Pasta não encontrada!");
return null;}
const arquivos = fs.readdirSync(dir).filter(file => 
['.mp4', '.mov', '.mkv'].includes(path.extname(file).toLowerCase()));
if (!arquivos.length) {
console.log("⚠️ Nenhum vídeo encontrado nessa rota!");
return null;}
const escolhido = path.join(dir, arquivos[Math.floor(Math.random() * arquivos.length)]);
return escolhido;
}

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType);
let buffer = Buffer.from([]);
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
return buffer;
};


//============( GETBUFFER )===========\\
const getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (err) {
return err
}
}

//============( FETCHJSON )===========\\
async function fetchJson (url, options) {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}
//============( DATA E HORA )===========\\
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

//============( MENSAGEM DE HORA )===========\\
if(hora > "00:00:00"){
var timed = 'Boa Madrugada 馃寙' 
} 
if(hora > "05:30:00"){
var timed = 'Bom Dia 馃彊锟' 
}
if(hora > "12:00:00"){
var timed = 'Boa Tarde 馃寚' 
}
if(hora > "19:00:00"){
var timed = 'Boa Noite 馃寖' 
} 

function checkPrefix(body, prefix) {
return body?.startsWith(prefix);
}

function loadJSON(path) {
try { return JSON.parse(fs.readFileSync(path, 'utf-8'));
} catch (err) { return [];}
}

function saveJSON(data, path) {
fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

const esperar = (tempo) => {
return new Promise(resolve => setTimeout(resolve, tempo));
}

// A função abaixo não foi feita por mim, Sz, apenas adaptei.
// O real criador apenas pediu para deixar os créditos (por isso o John repetitivo, kkkkkk).

// --------------- [ SISTEMA DE NOVIDADES - FUNÇÕES AUXILIARES ] ---------------
function verificarPastaNovidades() {
const pastaNovidades = './configs/novidades';
if (!fs.existsSync(pastaNovidades)) {
fs.mkdirSync(pastaNovidades, { recursive: true });
}
}
//Jonh
function saveJSON2(caminhoArquivo, conteudo) {
const pastaPai = path.dirname(caminhoArquivo);
if (!fs.existsSync(pastaPai)) {
fs.mkdirSync(pastaPai, { recursive: true });
}
fs.writeFileSync(caminhoArquivo, JSON.stringify(conteudo, null, 2), 'utf-8');
}
function lerOuCriarJSON(caminhoArquivo) {
verificarPastaNovidades();
try {
const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
return JSON.parse(conteudo);
} catch (error) {
console.error(`Ops, não deu pra ler o JSON em ${caminhoArquivo}:`, error);
return [];
}
}
// ------------------- [ CONFIGURAÇÕES PRINCIPAIS - By Jhon ] -------------------
const caminhoIndex = './index.js';
const caminhoCases = './configs/novidades/cases.json';
const caminhoNews = './configs/novidades/news.json';
// ------------------- [ SINCRONIZAR CASES - By Jhon ] -------------------
function sincronizarCases(subaru) {
try {
const conteudoIndex = fs.readFileSync(caminhoIndex, 'utf-8');
const matchesCases = conteudoIndex.match(/case\s*['"](.+?)['"]/g);
const nomesCasesIndex = matchesCases
  ? matchesCases.map(c => c.match(/['"](.+?)['"]/)[1])
  : [];
const comandosSalvos = lerOuCriarJSON(caminhoCases);
const nomesComandosSalvos = comandosSalvos.map(cmd => cmd.Comando);
const novosCases = nomesCasesIndex.filter(nome => !nomesComandosSalvos.includes(nome));
const objNovosComandos = novosCases.map(nome => ({
Comando: nome,
Função: 'Descrição pendente.'
}));
saveJSON2(caminhoNews, objNovosComandos);
saveJSON2(caminhoCases, [...comandosSalvos, ...objNovosComandos]);
if (novosCases.length > 0) {
  subaru.sendMessage(`${donoNmr}@s.whatsapp.net`, {
    text: `🔥 Opa, ${donoName}, novos comandos detectados: ${novosCases.join(', ')}`
  })};
//console.log('matchesCases:', matchesCases);
//console.log('nomesCasesIndex:', nomesCasesIndex);
//console.log('novosCases:', novosCases);
return nomesCasesIndex || [];
} catch (error) {
console.error('Xii, deu erro ao sincronizar os cases:', error);
}}
// ------------------- [ FIM DO SISTEMA DE NOVIDADES - By Jhon ] -------------------


module.exports = { escolherPersonalidadeSubaru, escolherVideoPorRota, getFileBuffer, checkPrefix, fetchJson, getBuffer, data, hora, loadJSON,saveJSON, saveJSON2, sincronizarCases, lerOuCriarJSON, esperar }

fs.watchFile(__filename, () => {
console.log(`Arquivo '${__filename}' foi modificado. \nReiniciando...`);
process.exit();
});