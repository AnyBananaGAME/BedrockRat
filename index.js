const version = '1.20.61'
const { createClient } = require('bedrock-protocol')
const { EventEmitter } = require('events')
const fs = require('fs')
const config = require('./config.json')
const { Physics, PlayerState } = require('prismarine-physics')
const ticker = new EventEmitter()
const mcData = require('./src/mcData/mcData')(`bedrock_${version}`)

/** @type {import('./types/index').BedrockRat} */
const client = createClient({
  host: config.host,
  port: config.port,
  offline: config.offline,
  username: config.username,
  version: config.version,
  skipPing: true
})

client.registry = mcData
client.version = `bedrock_${version}`

client.data = {
  position: { x: 0, y: 0, z: 0 },
  runtime_entity_id: 0,
  tick: 0,
  yaw: 0,
  pitch: 0,
  debug: true,
  world: {
    columns: {}

  }
}

ticker.on('tick', (tick) => {
  if (!client.movement) return
  client.movement.tick()

  if (client.playerState.teleportTicks === 0) {
    client.movement.send(client.controls)
    client.physics.simulatePlayer(client.playerState, client.world).apply(client)
  }
})

const libs = fs.readdirSync('./src/libs').filter(file => file.endsWith('js'));

(async () => {
  for (const lib of libs) {
    require('./src/libs/' + lib)(client)
  }
  const physics = Physics(mcData, client.world)
  client.physics = physics

  client.eventHandler()

  client.once('spawn', () => {
    const pos = client.startGameData.player_position
    client.data.runtime_entity_id = client.startGameData.runtime_entity_id
    client.data.position = { x: pos.x, y: pos.y - 1.621, z: pos.z }
    console.log('Spawned in! at: ', client.data.position)
    client.express()

    client.playerState = new PlayerState(client, client.controls)
    client.playerState.teleportTicks = 5
    const movement = require('./src/Player/Movement')(client, client.playerState)
    client.movement = movement

    client.clearControlStates = function () {
      movement.send(client.controls)
    }

    setInterval(() => ticker.emit('tick', ++client.data.tick), 50)
  })
})()
