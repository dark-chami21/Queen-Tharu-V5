const axios = require('axios');
const { tiktokScraper } = require('tiktok-scraper');
const fs = require('fs');
const path = require('path');

const tiktokDownload = async (url, options = {}) => {
  try {
    const videoData = await tiktokScraper(url);
    const videoUrl = videoData.collector[0].videoUrl;
    const videoId = videoData.videoId;
    const authorUsername = videoData.authorMeta.name;

    // Get video formats
    const formats = await getVideoFormats(videoUrl);

    // Choose the best format based on options
    let bestFormat;
    if (options.format) {
      bestFormat = formats.find((f) => f.format_id === options.format);
    } else {
      bestFormat = formats.sort((a, b) => b.height - a.height)[0];
    }

    // Download video
    const videoBuffer = await downloadVideo(bestFormat.url);

    // Save video to file (optional)
    if (options.saveToFile) {
      const filePath = path.join(options.saveToFile, `${videoId}_${authorUsername}.mp4`);
      fs.writeFileSync(filePath, videoBuffer);
      console.log(`Video saved to ${filePath}`);
    }

    return videoBuffer;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getVideoFormats = async (videoUrl) => {
  const response = await axios.get(videoUrl, {
    headers: {
      'User -Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  });

  const formats = [];
  const regex = /"format_id":(\d+),"width":(\d+),"height":(\d+),"fps":(\d+),"bitrate":(\d+),"filesize":(\d+),"url":"(.*?)"/g;
  let match;
  while ((match = regex.exec(response.data)) !== null) {
    formats.push({
      format_id: match[1],
      width: match[2],
      height: match[3],
      fps: match[4],
      bitrate: match[5],
      filesize: match[6],
      url: match[7],
    });
  }

  return formats;
};

const downloadVideo = async (url) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  return response.data;
};

module.exports = tiktokDownload;
```
*Usage*
```javascript
const tiktokDownload = require('./tiktokDownload');

// WhatsApp bot code...
bot.on('message', async (message) => {
  if (message.text.startsWith('/tiktok')) {
    const url = message.text.split(' ')[1];
    const options = {};
    if (message.text.includes(' --format=')) {
      options.format = message.text.split(' --format=')[1];
    }
    if (message.text.includes(' --save-to-file=')) {
      options.saveToFile = message.text.split(' --save-to-file=')[1];
    }

    const videoBuffer = await tiktokDownload(url, options);
    if (videoBuffer) {
      await message.reply('Downloading video...');
      await message.reply(videoBuffer, { asVideo: true });
    } else {
      await message.reply('Failed to download video.');
    }
  }
});
