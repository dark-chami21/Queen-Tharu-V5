const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "song",
    react: "🎧",
    desc: "downlod song",
    category: "downlod",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("*❌Please give me url or title*")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
 *©𝗠𝗨𝗦𝗜𝗖 𝐁𝐘 QUEEN_THARU_V➄*

> ➤ *title* : ${deta.title}

> ➤ *views* : ${deta.views}

> ➤ *time* : ${deta.timestamp}

> ➤ *ago* : ${deta.ago}

> *©𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 CHAMINDU*`

await conn.sendMessage(from,{image :{ url: deta.thumbnail},caption:desc},{quoted:mek});

//downlod audio+ document

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message 
await conn.sendMessage(from,{audio:{url:downloadUrl},mimetype:"audio/mpeg",caption :"> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚆𝙰𝚃𝚂𝙾𝙽 xᴅ*"},{quoted:mek})
await conn.sendMessage(from,{document:{url:downloadUrl},mimetype:"audio/mpeg",fileName:deta.title + ".mp3" ,caption :"> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚆𝙰𝚃𝚂𝙾𝙽 xᴅ*"},{quoted:mek})

  

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//========video dl=======

cmd({
    pattern: "video",
    react: "🎬",
    desc: "downlod video",
    category: "downlod",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("❌Please give me url or title")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
QUEEN_THARU_V➄ 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥

> ➤ *title* : ${deta.title}

> ➤ *views* : ${deta.views}

> ➤ *time* : ${deta.timestamp}

> ➤ *ago* : ${deta.ago}

 ©𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 CHAMINDU `

await conn.sendMessage(from,{image :{ url: deta.thumbnail},caption:desc},{quoted:mek});

//downlod video + document 

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video  message 
await conn.sendMessage(from,{video:{url:downloadUrl},mimetype:"video/mp4",caption :"> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚆𝙰𝚃𝚂𝙾𝙽 xᴅ*"},{quoted:mek})
await conn.sendMessage(from,{document:{url:downloadUrl},mimetype:"video/mp4",fileName:deta.title + ".mp4",caption :"> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚆𝙰𝚃𝚂𝙾𝙽 xᴅ*"},{quoted:mek})

  

}catch(e){
console.log(e)
reply(`${e}`)
}
})
