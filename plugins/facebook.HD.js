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
const fbDlByMrNima = require('@mrnima/facebook-downloader');


command.cmd({
    pattern: "fbhd",
    desc: "download facebook videos. [HD]",
    category: "download"
},
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
            if (!q) return reply("please give me url facebook video link.");
            await reply("```Downloading [ HD video ]...```")
            const result = await fbDlByMrNima.facebook(q);
            var caption = "*FACEBOOK DOWNLOADER*\n- Duration: " + result.result.duration
            var quality = result.result.links;
            if (quality.HD) {
                await conn.sendMessage(from, { video: { url: quality.HD }, mimetype: "video/mp4", caption: caption + "\n> HD QUALITY" }, { quoted: mek });
            }
        } catch (e) {
            console.log(e)
            reply(`${e}`)
        }
    })
