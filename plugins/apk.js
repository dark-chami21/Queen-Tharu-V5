const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const apkdl = require('../lib/apkdl')



cmd({
    pattern: "apk",
    react: "📱",
    alias: ["findapk","playstore"],
    
    category: "download",
    use: '.apk whatsapp',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await conn.sendMessage(from , { text: imgmsg }, { quoted: mek } )        
const data2 = await apkdl.search(q)
const data = data2
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
    const rows = []
for (var i = 0; i < data.length; i++)


 {

    rows.push({
        header: '',
        title: `${data[i].name}`,
        description: '',
        id: prefix + `dapk ${data[i].id}`
    })

}
let buttons = [{
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
            display_text: config.BTN,
            url: config.BTNURL,
            merchant_url: config.BTNURL
        }),
    },
    {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
            title: 'Select a Category :)',
            sections: [{
                title: 'Please select a category',
                highlight_label: 'DARK SHUTER',
                rows: rows

            }]
        }),
    }

]

let MNG = `\`✦ QUEEN_THARU_V➄ ✦\`

      ❒ 𝗔𝗽𝗸 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿 ❒

\`Apk name :\` ${q}


`

let opts = {
    image: config.LOGO,
    header: '',
    footer: config.FOOTER,
    body: MNG

}
return await conn.sendButtonMessage(from, buttons, m, opts)
} catch (e) {
    reply('ERROR !!')

   console.log(e)
}
})
cmd({
    pattern: "dapk",
    react: "📱",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: 'Need apk link...' }, { quoted: mek } ) 
const data = await apkdl.download(q)
let listdata = `📚 Name : ${data.name}
📦 Developer : ${data.package}
⬆️ Last update : ${data.lastup}
📥 Size : ${data.size}`
await conn.sendMessage(from, { image: { url: data.icon }, caption: listdata }, { quoted: mek })
//if (data.size.includes('GB')) return await conn.sendMessage(from , { text: 'File size is too big...' }, { quoted: mek } )
//if (data.size.includes('MB') && data.size.replace(' MB','') > config.MAX_SIZE) return await conn.sendMessage(from , { text: 'File size is too big...' }, { quoted: mek } )
let sendapk = await conn.sendMessage(from , { document : { url : data.dllink } , mimetype : 'application/vnd.android.package-archive' , fileName : data.name + '.' + 'apk',caption: '' } , { quoted: mek })
await conn.sendMessage(from, { react: { text: '📁', key: sendapk.key }})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply('ERROR !!')
    console.log(e)
}
})
