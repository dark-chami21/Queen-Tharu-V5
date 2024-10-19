import ytdl from 'ytdl-core';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';
let streamPipeline = promisify(pipeline);
let handler = async (m, { conn, command, text, usedPrefix }) => {
await conn.sendMessage(m.chat, {
        react: {
            text: "🕒",
            key: m.key,
        }
    })
  if (!text) throw `Usage: ${usedPrefix}${command} <YouTube වීඩියෝ සබැඳිය>`;
  let videoUrl = text; // Gunakan URL video YouTube yang diberikan sebagai input
  let videoInfo = await ytdl.getInfo(videoUrl);
  let { videoDetails } = videoInfo;
  let { title, thumbnails, lengthSeconds, viewCount, uploadDate } = videoDetails;
  let thumbnail = thumbnails[0].url; // Gunakan thumbnail pertama
  let audioStream = ytdl(videoUrl, {
    filter: 'audioonly',
    quality: 'highestaudio',
  });
  let tmpDir = os.tmpdir();
  let writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
  await streamPipeline(audioStream, writableStream);
  let doc = {
    audio: {
      url: `${tmpDir}/${title}.mp3`
    },
    mimetype: 'audio/mp4',
    fileName: `${title}`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: videoUrl,
        title: title,
        sourceUrl: videoUrl,
        thumbnail: await (await conn.getFile(thumbnail)).data
      }
    }
  };
  await conn.sendMessage(m.chat, doc, { quoted: m });
  fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
    if (err) {
      console.error(`ශ්‍රව්‍ය ගොනුව මැකීමට අසමත් විය!!!: ${err}`);
    } else {
      console.log(`ශ්‍රව්‍ය ගොනුව මැකීය: ${tmpDir}/${title}.mp3`);
    }
  });
};

handler.help = ['ytmp3'].map((v) => v + ' <YouTube Video URL>');
handler.tags = ['downloader'];
handler.command = /^(ytmp3|yta)$/i;

handler.exp = 0;
handler.diamond = false;

export default handler;
