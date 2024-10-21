const { cmd } = require('../command'); 
const ytdl = require('ytdl-core');
const axios = require('axios');

// YouTube API Key
const API_KEY = 'https://api-pink-venom.vercel.app/api/ytdl?url=$';

// Function to get YouTube video details using YouTube Data API v3
async function getYouTubeVideoDetails(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${API_KEY}&type=video&maxResults=1`;

    try {
        const response = await axios.get(url);
        const video = response.data.items[0];

        if (video) {
            const videoId = video.id.videoId;
            const videoDetails = {
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnail: video.snippet.thumbnails.high.url,
                videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
            };
            return videoDetails;
        } else {
            throw new Error("No video found");
        }
    } catch (error) {
        console.error("Error fetching video details: ", error);
        throw error;
    }
}

// Command for downloading a song (audio)
cmd({
    pattern: "song",
    react: "🎵",
    desc: "Download song",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*❌ Please provide a URL or title*");

        const videoDetails = await getYouTubeVideoDetails(q);

        let desc = `
         *🎶 Audio Downloader 🎶*
        | Title: ${videoDetails.title}
        | Description: ${videoDetails.description}
        `;

        await conn.sendMessage(from, { image: { url: videoDetails.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio using ytdl-core
        const audioStream = ytdl(videoDetails.videoUrl, { filter: 'audioonly' });
        await conn.sendMessage(from, { audio: { stream: audioStream }, mimetype: "audio/mpeg", fileName: videoDetails.title + ".mp3" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Command for downloading a video
cmd({
    pattern: "video",
    react: "🎥",
    desc: "Download video",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*❌ Please provide a URL or title*");

        const videoDetails = await getYouTubeVideoDetails(q);

        let desc = `
         *📽️ Video Downloader 📽️*
        | Title: ${videoDetails.title}
        | Description: ${videoDetails.description}
        `;

        await conn.sendMessage(from, { image: { url: videoDetails.thumbnail }, caption: desc }, { quoted: mek });

        // Download video using ytdl-core
        const videoStream = ytdl(videoDetails.videoUrl, { filter: 'videoandaudio' });
        await conn.sendMessage(from, { video: { stream: videoStream }, mimetype: "video/mp4", fileName: videoDetails.title + ".mp4" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
