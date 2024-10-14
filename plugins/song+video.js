import axios from'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh penggunaan: ${usedPrefix + command} <query>`;

    const searchQuery = text.trim();
    try {
        await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});

        const { data } = await axios.get(`https://apisku-furina.vercel.app/api/downloader/play?q=${searchQuery}&apikey=indradev`);

        if (!data.status) throw new Error('Video not found or an error occurred.');

        const audioData = data.result;

        const detailMessage = `「 *Detail Video* 」\n\n` +
            `📝 *Title:* ${audioData.title}\n` +
            `🎶 *Quality:* 128kbps\n` +
            `🎦 *Durasi:* ${audioData.duration}\n` +
            `👤 *Author:* ${audioData.name}`;

        await conn.sendMessage(m.chat, {
            text: detailMessage,
            contextInfo: {
                externalAdReply: {
                    title: audioData.title,
                    body: audioData.description || 'Click here for more details',
                    thumbnailUrl: audioData.thumbnail,
                    sourceUrl: audioData.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        await conn.sendMessage(m.chat, {
            audio: { url: audioData.mp3 },
            mimetype: 'audio/mp4'
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        if (e.message.includes('Video not found')) {
            throw '❌ Gagal mendownload audio!';
        } else {
            conn.reply(m.chat, 'An error occurred: ' + e.message, m);
        }
    }
}

handler.help = ["play"];
handler.tags = ["music"];
handler.command = /^play$/i;

export default handler

//==============================video-dl========================================

cmd({
    pattern: "video",
    desc: "download videos",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("please give me url")
const search =await yts(q)
const data = search.videos[0];
const url = data.url

let desc = `
*QUEEN THARU VIDEO DOWNLOADER 🎬⬇️*

title: ${data.title}
description: ${data.description}
time: ${data.timestamp}
ago: ${data.ago}
views: ${data.views}

*MADE BY CHAMI*
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video=========================

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message=====================
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*MADE BY CHAMI*"},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
