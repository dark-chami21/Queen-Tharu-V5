const config = require('../config')
const fetch = require('node-fetch')
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    getsize,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
} = require('../lib/functions')
const {
    cmd,
    commands
} = require('../command')

let foot = config.FOOTER

async function dlyta(url, type) {
    try {
        const maxAttempts = 10;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const response = await fetch(`https://api-pink-venom.vercel.app/api/ytdl?url=${url}&type=${type}`);
            const result = await response.json();

            if (result.result.download_url) {
                return {
                    status: true,
                    dl_link: result.result.download_url
                };
            }

            await new Promise(resolve => setTimeout(resolve, 4000));
        }
        
        return { status: false, msg: 'Error fetching the download link.' };

    } catch (e) {
        console.error(e);
        return { status: false, msg: e.message };
    }
}

// Command for downloading audio
cmd({
    pattern: "yta2",
    react: "🎵",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply('📥 Need a YouTube URL!');

        const prog = await dlyta(q, 'audio');

        if (prog.status) {
            await conn.sendMessage(from, { audio: { url: prog.dl_link }, mimetype: 'audio/mpeg' }, { quoted: mek });
        } else {
            await reply(`❌ Failed to process the request: ${prog.msg}`);
        }

    } catch (e) {
        console.log('First attempt failed:', e);

        try {
            const prog = await dlyta(q, 'audio');

            if (prog.status) {
                await conn.sendMessage(from, { audio: { url: prog.dl_link }, mimetype: 'audio/mpeg' }, { quoted: mek });
            } else {
                await reply(`❌ Failed to process the request: ${prog.msg}`);
            }
        } catch (error) {
            console.log('Second attempt failed:', error);
            await reply('🚫 Failed to process the request. Please try again later!');
        }
    }
});

// Command for downloading video
cmd({
    pattern: "ytv2",
    react: "🎥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply('📥 Need a YouTube URL!');

        const prog = await dlyta(q, 'video');

        if (prog.status) {
            await conn.sendMessage(from, { video: { url: prog.dl_link }, mimetype: 'video/mp4' }, { quoted: mek });
        } else {
            await reply(`❌ Failed to process the request: ${prog.msg}`);
        }

    } catch (e) {
        console.log('First attempt failed:', e);

        try {
            const prog = await dlyta(q, 'video');

            if (prog.status) {
                await conn.sendMessage(from, { video: { url: prog.dl_link }, mimetype: 'video/mp4' }, { quoted: mek });
            } else {
                await reply(`❌ Failed to process the request: ${prog.msg}`);
            }
        } catch (error) {
            console.log('Second attempt failed:', error);
            await reply('🚫 Failed to process the request. Please try again later!');
        }
    }
});
