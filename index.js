const { createClient } = require('bedrock-protocol')
const { EventEmitter } = require('events')
const fs = require('fs')
const config = require('./config.json')

/** @type {import('./types/index').BedrockRat}*/
const client = createClient({
  host: config.host,
  port: config.port,
  offline: config.offline,
  username: config.username,
  version: config.version
});

client.data = {
  position: { x: 0, y: 0, z: 0 },
  runtime_entity_id: 0,
  tick: 0
}
const libs = fs.readdirSync('./libs').filter(file => file.endsWith('js'));

(async () => {
  for (const lib of libs) {
    require('./libs/' + lib)(client)
  }

  const ticker = new EventEmitter()

  client.once('spawn', () => {
    const pos = client.startGameData.player_position
    client.data.runtime_entity_id = client.startGameData.runtime_entity_id
    client.data.position = pos

    setInterval(() => ticker.emit('tick', ++client.data.tick), 50)
  })

  client.on('move_player', (params) => {
    if (BigInt(params.runtime_id) !== client.data.runtime_entity_id) return
    if (params.mode !== 'teleport') return
    const position = client.data.position
    position.x = Number(params.position.x)
    position.y = Number(params.position.y)
    position.z = Number(params.position.z)
  })

  client.on('text', async (packet) => {
    if (packet.message.includes('mine')) {
      const position = client.data.position
      client.mine({ x: position.x, y: position.y - 1, z: position.z })
    }
  })
})()
