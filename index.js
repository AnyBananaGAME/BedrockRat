const version = '1.20.61'
const { createClient } = require('bedrock-protocol')
const { EventEmitter } = require('events')
const fs = require('fs')
const config = require('./config.json')
const { Physics, PlayerState } = require('prismarine-physics')
const { LibHandler } = require('./src/libs/LibHandler')
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
});

(async () => {
  new LibHandler(client).handle();

  const physics = Physics(mcData, client.world)
  client.physics = physics


  client.once('spawn', () => {
    console.log("Player has spawned in! At: " + client.entity.position)

    setInterval(() => ticker.emit('tick', ++client.data.tick), 50);
  })
})()
