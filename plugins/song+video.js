const { cmd, commands } = require('../command');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

// ====== SONG DOWNLOAD COMMAND ======
cmd({
    pattern: "song",
    desc: "Download songs",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ _Please provide a URL or title!_");
        
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `🎶 *DIZER SONG DOWNLOADER* 🎶
        
        *➤ Title*: _${data.title}_
        *➤ Description*: _${data.description || 'N/A'}_
        *➤ Duration*: _${data.timestamp}_
        *➤ Uploaded*: _${data.ago}_
        *➤ Views*: _${data.views}_

        *🌟 POWERED BY DIZER 🌟*`;

        // Send the song details and thumbnail
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio using ytdl-core
        const audioStream = ytdl(url, { filter: 'audioonly' });

        // Send audio message
        await conn.sendMessage(from, { audio: { url: audioStream }, mimetype: "audio/mpeg", caption: `> _*POWERED BY DIZER*_ 🎧` }, { quoted: mek });

        // Send document message with the audio
        await conn.sendMessage(from, { document: audioStream, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: `🎵 _*DIZER AUDIO DOWNLOAD...*_` }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ====== VIDEO DOWNLOAD COMMAND ======
cmd({
    pattern: "video",
    desc: "Download videos",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ _Please provide a URL or title!_");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `🎬 *DIZER VIDEO DOWNLOADER* 🎬
        
        *➤ Title*: _${data.title}_
        *➤ Description*: _${data.description || 'N/A'}_
        *➤ Duration*: _${data.timestamp}_
        *➤ Uploaded*: _${data.ago}_
        *➤ Views*: _${data.views}_

        *🌟 POWERED BY DIZER 🌟*`;

        // Send the video details and thumbnail
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download video using ytdl-core
        const videoStream = ytdl(url);

        // Send video message
        await conn.sendMessage(from, { video: videoStream, mimetype: "video/mp4", caption: `> _*POWERED BY DIZER*_ 🎥` }, { quoted: mek });

        // Send document message with the video
        await conn.sendMessage(from, { document: videoStream, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: `🎬 _*DIZER VIDEO DOWNLOAD...*_` }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});
