cmd({
  pattern: "tiktok2",
  desc: "Download TikTok videos.",
  react: "🎵",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
  try {
    const senderNumber = m.sender;
    const isGroup = m.isGroup || false;

    if (!checkAccess(senderNumber, isGroup)) {
      return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
    }
    
    if (!q) return reply("🪄 Please provide a TikTok video URL!");

    const apiUrl = `https://deliriusapi-official.vercel.app/download/tiktok?url=${encodeURIComponent(q)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.data) return reply("❌ Error fetching data. Please check the URL.");

    const { title, duration, author, music, meta } = data.data;

    if (!meta || !meta.media || meta.media.length === 0) {
      return reply("❌ No media found for this TikTok.");
    }

    const video = meta.media[0];
    const videoUrl = video.org; // Original video URL

    let desc = `> 🎵 *Title*: ${title || "No Title"}
> ⏳ *Duration*: ${duration} seconds
> 👤 *Author*: ${author.nickname} (@${author.username})
> 🎶 *Music*: ${music.title} by ${music.author}
> 🔗 *Download URL*: ${videoUrl}
  
*© Powered by Tharu MD*`;

    // Sending video details and the download link
    await conn.sendMessage(from, {
      document: { url: videoUrl }, // You can choose to send a thumbnail or the video file directly
      fileName: 'TikTok Video',
      mimetype: "video/mp4",
      caption: desc,
      contextInfo: {
        externalAdReply: {
          title: title || "TikTok Video",
          thumbnailUrl: video.wm || "default_thumbnail_url",
          sourceUrl: videoUrl,
          mediaType: 2,
          renderLargerThumbnail: true
        }
      }
    });

  } catch (e) {
    console.error(e);
    reply(`An error occurred: ${e.message}`);
  }
});
