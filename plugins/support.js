const config = require('../config')

const {cmd , commands} = require('../command')



cmd({

    pattern: "support",

    desc: "To get the bot informations.",

    react: "🫵",

    category: "main",

    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{



let about = ` *👋 Hello ${pushname}*

*🤖 WATSON-XD Support Channels🤖*

*Youtube Channel Link:* https://www.youtube.com/@WATSON_TECH

*Whatsapp Channel Link:* https://whatsapp.com/channel/0029VajjzuB9sBI890YffB1b

*©𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 QUEEN_THARU_V➄*`

return await conn.sendMessage(from,{image: {url:`https://i.imgur.com/wZj8PVg.jpeg},caption:about},{quoted: mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
