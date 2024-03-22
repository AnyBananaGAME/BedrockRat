const mcdata = require('minecraft-data')('bedrock_1.20.61')
/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'text',
  once: false,
  execute: async (params, client) => {
    const code = params.message.replace(/§[0-9a-fk-or]/gi, '').replace(/%/g, '')
    if (params.message.includes('mine')) {
      const v = client.entity.position
      const x = v.x
      for (let i = 0; i < 5; i++) {
        await client.mine({ x: x + i, y: v.y - 1, z: v.z })
      }
    }

    if (mcdata.language[code]) {
      let translatedMessage = mcdata.language[code]

      for (let i = 0; i < params.parameters.length; i++) {
        const placeholder = '%s'
        translatedMessage = translatedMessage.replace(placeholder, params.parameters[i])
      }

      console.log(translatedMessage)
    } else {
      console.log('No translation found for code:', code)
    }
  }
}
