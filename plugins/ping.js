const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    desc: "Check bot response time.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const start = Date.now();
        
        let message = await conn.sendMessage(from, {
            text: `🏓 *Pinging...*`
        }, { quoted: mek });
        
        const end = Date.now();
        const ping = end - start;
        
        
        await conn.updateMessage(from, message.key, {
            text: `🏓 *Pong!*\n📡 Response time: *${ping}ms* 🕒`
        });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
