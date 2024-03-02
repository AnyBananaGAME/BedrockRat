const fs = require('fs')

/** @param {import("../../../../types/index").BedrockRat} client */
module.exports = (client) => {
  client.eventHandler = async () => {
    const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'))

    for (const file of eventFiles) {
      /** @type {import("../../../../types/events/Event").Event} */
      const event = require("../../../events/" + file)
      if (client.data.debug) {
        console.log('[debug] New Event added: ', event.name)
      }
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
      } else {
        client.on(event.name, (...args) => event.execute(...args, client))
      }
    }
  }
  client.once("spawn", () => {client.eventHandler()})
}
