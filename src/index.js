import WhatsappClient from 'whatsapp-web.js'
import QrCode from 'qrcode'

import Events from './enum/events.js'

const client = new WhatsappClient.Client()

client.on(Events.QR, (qr) => {
  QrCode.toString(qr, { type: 'terminal' }, (error, url) => {
    console.log(url)
  })
})

client.on(Events.READY, () => {
  console.log('Application is up and running!')
})

client.on(Events.MESSAGE, async (message) => {
  const chat = await message.getChat()

  if (chat.isGroup) {
    chat.archive()
  }
})

client.initialize()
