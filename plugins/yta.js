/*

THIS CODE WAS WRITTEN BY MR Chami ( Chami ) - ( FREELY ).
    - @Chamindu
GITHUB : https://github.com/dark-chami21
------------------------------------------------------------------
CODE FOR : @dark-chami21
------------------------------------------------------------------
DON'T REMOVE CREDITS !

*/



const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "yta",
    react: "🎵",
    desc: "song",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://api-pink-venom.vercel.app/api/ytdl?url=$`)
return reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})
