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
const ttDlByMrNima = require("@mrnima/tiktok-downloader");


command.cmd({
    pattern: "tiktok2",
    desc: "download tiktok videos [ 2 ].",
    category: "download"
},
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
            if (!q) return reply("please give me url tiktok video link.");
            await reply("```Downloading ...```")
            const result = await ttDlByMrNima.downloadTiktok (q);
            var caption = "*TIKTOK DOWNLOADER*\n- title: " + result.result.title;
            var download_link = result.result.dl_link.download_mp4_2
            await conn.sendMessage(from, { video: { url: download_link }, mimetype: "video/mp4", caption: caption }, { quoted: mek });

        } catch (e) {
            console.log(e)
            reply(`${e}`)
        }
    })