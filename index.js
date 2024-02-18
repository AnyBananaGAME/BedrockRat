const { createClient } = require('bedrock-protocol')
const { EventEmitter } = require('events')
const fs = require('fs')
const config = require('./config.json')
const ticker = new EventEmitter()

/** @type {import('./types/index').BedrockRat} */
const client = createClient({
  host: config.host,
  port: config.port,
  offline: config.offline,
  username: config.username,
  version: config.version,
  skipPing: false
})

client.data = {
  position: { x: 0, y: 0, z: 0 },
  runtime_entity_id: 0,
  tick: 0,
  yaw: 0,
  pitch: 0,
  debug: true
}
const libs = fs.readdirSync('./src/libs').filter(file => file.endsWith('js'));

(async () => {
  for (const lib of libs) {
    require('./src/libs/' + lib)(client)
  }

  client.eventHandler()
  
  client.once('spawn', () => {
    const pos = client.startGameData.player_position
    client.data.runtime_entity_id = client.startGameData.runtime_entity_id
    client.data.position = pos
    console.log('Spawned in! at: ', pos)
    client.express()
    setInterval(() => ticker.emit('tick', ++client.data.tick), 50)
    
  })
})()
