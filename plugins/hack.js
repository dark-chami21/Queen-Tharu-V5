const { cmd, commands } = require('../command');

cmd({
    pattern: "hack",
    desc: "Prank hack simulation.",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Start the fake hacking message
        let message = await conn.sendMessage(from, { text: `💻 Initiating hack...` }, { quoted: mek });

        // Simulate step-by-step hacking process
        setTimeout(async () => {
            await conn.updateMessage(from, message.key, { text: `🔍 Bypassing firewall...` });
        }, 2000);

        setTimeout(async () => {
            await conn.updateMessage(from, message.key, { text: `🔑 Cracking passwords...` });
        }, 4000);

        setTimeout(async () => {
            await conn.updateMessage(from, message.key, { text: `📂 Accessing personal data...` });
        }, 6000);

        setTimeout(async () => {
            await conn.updateMessage(from, message.key, { text: `📝 Downloading sensitive files...` });
        }, 8000);

        setTimeout(async () => {
            await conn.updateMessage(from, message.key, { text: `✅ Hack completed successfully!\n😂 Just kidding, it's a prank!` });
        }, 10000);
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
