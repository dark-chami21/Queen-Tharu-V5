const config = require('../config')
const l = console.log
const { cmd } = require('../command')
const dl = require('@bochilteam/scraper')
const ytdl = require('yt-search');

cmd({
    pattern: "song", 
    alias: ["ytmusic", "ytaudio", "songdl"], 
    use: '.sindu <query>', // Usage
    react: "🎵", // Reaction emoji
    desc: "Search & download music from YouTube.", 
    category: "download", 
    filename: __filename
},
async(conn, mek, m, { from, quoted, args, q, reply }) => {
    try {
        if (!q) return reply('Please provide a song name or query to download');

        let yts = require("yt-search");
        let search = await yts(q);
        let video = search.videos[0];

        if (!video) return reply("No results found");

        const cap = `🎶 *Music Downloader* 🎶
        
        *Title:* ${video.title}
        *Duration:* ${video.timestamp}
        *Views:* ${video.views}
        *URL:* ${video.url}
        
        _Downloading... Please wait!_`;

        await conn.sendMessage(from, { text: cap }, { quoted: mek });

        const ytData = await dl.youtubedl(video.url).catch(async () => await dl.youtubedlv2(video.url));
        const audioData = ytData.audio['128kbps'];

        if (audioData.fileSizeH.includes('MB') && audioData.fileSizeH.replace(' MB', '') >= config.MAX_SIZE) {
            return reply('The audio file is too large to download.');
        }

        const audioUrl = await audioData.download();
        await conn.sendMessage(from, { document: { url: audioUrl }, mimetype: 'audio/mpeg', fileName: `${video.title}.mp3`, caption: `🎧 Download complete!` }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '🎶', key: mek.key }});
    } catch (e) {
        l(e);
        reply('An error occurred while processing your request.');
    }
});
