import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '*උදාහරණයක්*: .apk whatsapp', m)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  const res = await axios.get(`https://api.lolhuman.xyz/api/playstore?apikey=${global.lolkey}&query=${encodeURIComponent(text)}`)
  const data = res.data.result[0]
  if (!data) return conn.reply(m.chat, `එම නමින් යෙදුම සොයාගත නොහැක "${text}" PlayStore හි ඇති.`, m)
  let caption = `
*${data.title}*
*ID*: ${data.appId}
*Developer*: ${data.developer}
*Price*: ${data.free ? 'Gratis' : data.price + ' ' + data.currency}
*Rating*: ${data.scoreText}
*Link*: ${data.url}
  `
  conn.sendFile(m.chat, data.icon, 'playstore.png', caption, m)
}

handler.help = ['apk <nama aplikasi>']
handler.tags = ['internet']
handler.command = /^(apk)$/i

export default handler 
