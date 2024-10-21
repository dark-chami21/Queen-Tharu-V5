const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

// ====== SONG DOWNLOAD COMMAND ======
cmd({
    pattern: "song",
    react: "🎧",
    desc: "Download song",
    category: "download",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("_❌ Please provide a URL or title._");
        
        const search = await yts(q);
        const song = search.videos[0];
        const url = song.url;

        let description = `
        *🎵 𝗠𝗨𝗦𝗜𝗖 𝐁𝐘 QUEEN_THARU_V➄ 🎵*
        *➤ Title*: _${song.title}_
        *➤ Views*: _${song.views}_
        *➤ Duration*: _${song.timestamp}_
        *➤ Uploaded*: _${song.ago}_
        *© POWERED BY DIZER*
        `;

        await conn.sendMessage(from, { image: { url: song.thumbnail }, caption: description }, { quoted: mek });

        // Download audio and send it as a document
        const audioData = await fg.yta(url);
        const audioUrl = audioData.dl_url;

        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            caption: `> _*POWERED BY DIZER*_`
        }, { quoted: mek });

        await conn.sendMessage(from, {
            document: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${song.title}.mp3`,
            caption: `> _*POWERED BY DIZER*_`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`_❌ Error: ${e.message}_`);
    }
});

// ====== VIDEO DOWNLOAD COMMAND ======
cmd({
    pattern: "video",
    react: "🎬",
    desc: "Download video",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("_❌ Please provide a URL or title._");

        const search = await yts(q);
        const video = search.videos[0];
        const url = video.url;

        let description = `
        *🎬 QUEEN_THARU_V➄ VIDEO DOWNLOADER 🎬*
        *➤ Title*: _${video.title}_
        *➤ Views*: _${video.views}_
        *➤ Duration*: _${video.timestamp}_
        *➤ Uploaded*: _${video.ago}_
        *© POWERED BY DIZER*
        `;

        await conn.sendMessage(from, { image: { url: video.thumbnail }, caption: description }, { quoted: mek });

        // Download video and send it as a document
        const videoData = await fg.ytv(url);
        const videoUrl = videoData.dl_url;

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: `> _*POWERED BY DIZER*_`
        }, { quoted: mek });

        await conn.sendMessage(from, {
            document: { url: videoUrl },
            mimetype: "video/mp4",
            fileName: `${video.title}.mp4`,
            caption: `> _*POWERED BY DIZER*_`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`_❌ Error: ${e.message}_`);
    }
});
