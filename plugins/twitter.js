const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
let needus = "*Please give me a x url!*" 

//==========================================for button users==============================================

cmd({
    pattern: "twitter",    
    alias: ["x","twit","twitterdl"],
    react: '🌀',
    desc: "Download tiktok videos",
    category: "download",
    use: '.twitter < twitter url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
  
  if (!q) return await reply('TEXT') 
      if (!q.includes('tiktok')) return await reply('valid_url') 


const mov = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/twitter?url=${q}`)
    
let mala = `乂 *X - D O W N L O A D E R*

    *◦ Title:* ${mov.result.desc}
`
                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: config.BTN,
                        url: config.BTNURL,
                        merchant_url: config.BTNURL
                    }),
                },
                { name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Tap Here!',
               sections: [{
                  rows: [{
                     title: 'DOWNLOAD VIDEO SD QUALITY',
                     // description: `X`,
                     id: prefix + `xdl ${mov.result.video_sd}`
                  }, {
                     title: 'DOWNLOAD VIDEO HD QUALITY',
                     // description: `X`,
                     id: prefix + `xdl ${mov.result.video_hd}`
                  }, {
                     title: 'DOWNLOAD AUDIO',
                     // description: `X`,
                     id: prefix + `xmp3 ${mov.result.audio}`
		  }]
               }]
            })
         }]
	

        let message = {
            image: mov.result.thumb,
            header: '',
            footer: config.FOOTER,
            body: mala
        }   
return conn.sendButtonMessage(from, buttons, m, message) 
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
//===========================================================================
cmd({
    pattern: "xdl",
    react: '💫',
    dontAddCommandList: true,
    use: '.xdl <x link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(needus)
let wm = config.FOOTER
await conn.sendMessage(from, { video: { url: q }, caption: wm}, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
//==============================================================================

cmd({
    pattern: "xmp3",
    react: '💫',
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(needus)
conn.sendMessage(from , { audio : { url : q  } ,mimetype: 'audio/mpeg' } , { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})




//-------- *For Button Users* --
