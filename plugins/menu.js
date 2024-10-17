const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    react: "📄",
    desc: "cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: '',
};
for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `.${commands[i].pattern}\n`;
 }
}

let madeMenu = `

👋 *HELLO ${pushname}*

╭─「 *Welcome to QUEEN_THARU_V➄* 」
╰─────────────

╭─「 *Download Menu* 」
╰──────────────
> ⟡━⟪ *📥* ⟫━⟡
╭────────────◦✘
 ╎ .apk
 ╎ .fb
 ╎ .tiktok
 ╎ .twitter 
 ╎ .gdrive
 ╎ .mediafire 
 ╎ .ig
 ╎ .movie 
╰────────────◦✘

╭─「 *Main Menu* 」
╰──────────────
> ⟡━⟪ *👤* ⟫━⟡
╭────────────◦✘
 ╎ .about
 ╎ .ai
 ╎ .alive
 ╎ .menu
 ╎ .owner
 ╎ .ping
 ╎ .repo
 ╎ .support
 ╎ .system 
╰────────────◦✘

╭─「 *Fun Menu* 」
╰──────────────
> ⟡━⟪ *🧘* ⟫━⟡
╭────────────◦✘
 ╎ .animegirl
 ╎ .dog
 ╎ .fact
 ╎ .hack 
 ╎ .joke
 ╎ .quote
 ╎ .rvideo 
╰────────────◦✘

╭─「 *Convert Menu* 」
╰──────────────
> ⟡━⟪ *🔄* ⟫━⟡
╭────────────◦✘
 ╎ .convert
╰────────────◦✘

╭─「 *Search Menu* 」
╰──────────────
> ⟡━⟪ *🔍* ⟫━⟡
╭────────────◦✘
 ╎ .phub
 ╎ .srepo
 ╎ .yts
╰────────────◦✘

╭─「 *Group Menu* 」
╰──────────────
> ⟡━⟪ *👥* ⟫━⟡
╭────────────◦✘
 ╎ .mute
 ╎ .unmute
 ╎ .promote
 ╎ .demote 
 ╎ .del
 ╎ .remove 
 ╎ .add
 ╎ .setgoodbye
 ╎ .setwelcome
 ╎ .getpic
╰────────────◦✘

╭─「 *Owner Menu* 」
╰──────────────
> ⟡━⟪ *🫡* ⟫━⟡
╭────────────◦✘
 ╎ .shutdown
 ╎ .broadcast
 ╎ .setpp
 ╎ .block
 ╎ .unblock
 ╎ .clearchats
 ╎ .jid
 ╎ .gjid
 ╎ .restart
 ╎ .setautobio
╰────────────◦✘

╭─「 *News Menu* 」
╰──────────────
> ⟡━⟪ *👤* ⟫━⟡
╭────────────◦✘
 ╎ .hiru
 ╎ .derana
 ╎ .sirasa
 ╎ .lankadeepa
 ╎ .bbc
╰────────────◦✘

╭─「 *Other Menu* 」
╰──────────────
> ⟡━⟪ *📜* ⟫━⟡
╭────────────◦✘
 ╎ .define
 ╎ .githubstalk
 ╎ .gpass
 ╎ .trt
 ╎ .weather 
╰────────────◦✘

*CODE BY CHAMINDU*
*QUEEN_THARU_V➄*
`
await conn.sendMessage(from,{image:{url:"https://i.ibb.co/YhYStZ8/IMG-20240923-WA0006.jpg"},caption:madeMenu},{quoted:mek})



}catch(e){
console.log(e)
reply(`${e}`)
}
})
