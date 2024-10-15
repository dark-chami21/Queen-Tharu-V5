
/*

THIS CODE WAS WRITTEN BY MR NIMA ( DARKMAKEROFC ) - ( FREELY ).
    - @DarkMakerofc
    - @elisacoders
IS ANY ONE HAVE PROBLEM OR WANT HELP ? 
CONTACT US : elisacoders@gmail.com
GITHUB : https://github.com/DarkMakerofc
------------------------------------------------------------------
CODE FOR : @dark-chami21
------------------------------------------------------------------
DON'T REMOVE CREDITS !

*/


const command = require("../command");
const nima = require("@mrnima/technology_news_info")


command.cmd({
    pattern: "technews",
    desc: "Wabetainfo link info get.",
    category: "download"
},
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
            await reply("```Fetching ...```")
            var result = await nima.latest_news();
            const data = result.result;
            let desc = `
*QUEEN THARU TECHNOLOGY NEWS*
            
title: ${data.title}

description: ${data.desc}
            
*MADE BY CHAMI*
            `
            await conn.sendMessage(from, { image: { url: data.img.split("?")[0] || "https://avatars.githubusercontent.com/u/108072422?v=4"}, caption: desc }, { quoted: mek });

        } catch (e) {
            console.log(e)
            reply(`${e}`)
        }
    })
