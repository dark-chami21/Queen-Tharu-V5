const os = require('os'); // For system info
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "alive",
    react: "✅",
    desc: "Check if the bot is online along with system info.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Get system information
        const uptime = os.uptime(); // System uptime in seconds
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2); // Total memory in GB
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2); // Free memory in GB
        const platform = os.platform(); // OS platform
        const cpu = os.cpus()[0].model; // CPU model
        const botUptime = process.uptime(); // Bot uptime in seconds

        // Format uptime to hh:mm:ss
        const formatUptime = (secs) => {
            const hours = Math.floor(secs / 3600);
            const minutes = Math.floor((secs % 3600) / 60);
            const seconds = secs % 60;
            return `${hours}h ${minutes}m ${seconds}s`;
        };

        // Alive message with system and bot info
        const aliveMessage = `
        🤖 *Bot Status*:
        ✅ *Bot is Online!*

        💻 *System Information*:
        🕒 *System Uptime*: ${formatUptime(uptime)}
        💾 *Total Memory*: ${totalMem} GB
        🆓 *Free Memory*: ${freeMem} GB
        🖥️ *Platform*: ${platform}
        ⚙️ *CPU*: ${cpu}

        🚀 *Bot Uptime*: ${formatUptime(botUptime)}
        `;

        // Send the alive message with image
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: aliveMessage
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
