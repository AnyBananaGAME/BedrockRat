const version = '1.20.61'
const { createClient } = require('bedrock-protocol')
const { EventEmitter } = require('events')
const config = require('./config.json')
const { Physics } = require('prismarine-physics')
const { LibHandler } = require('./src/libs/LibHandler')
const { InventoryTransaction, ACTION_TYPE, TRANSACTION_TYPE } = require('./src/network/packets/InventoryTransaction')
const { Vec3 } = require('vec3')
const { Container } = require('./src/network/types/Container')
const bedrockViewer = require('bedrock-viewer')
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
  request_id: -2,
  debug: true,
  world: {
    columns: {}

  },
  container: undefined,
  hotbar_slot: 0,
  entities: []
}
client.inventory = new Container(2, 'inventory', new Vec3(0, 0, 0), client.data.runtime_entity_id)

ticker.on('tick', (tick) => {
  if (!client.movement) return
  client.movement.tick()

  if (client.playerState.teleportTicks === 0) {
    client.movement.send(client.controls)
    client.physics.simulatePlayer(client.playerState, client.world).apply(client)
  }
});

(async () => {
  await new LibHandler(client).handle()

  const physics = Physics(mcData, client.world)
  client.physics = physics

  client.once('spawn', () => {
    console.log('Player has spawned in! At: ' + client.entity.position)
    setInterval(() => ticker.emit('tick', ++client.data.tick), 50)

    if (client.data.debug) {
      const transaction = new InventoryTransaction(client, TRANSACTION_TYPE.ITEM_USE, [], ACTION_TYPE.CLICK_BLOCK, { block_position: new Vec3(462, 64, 194), hotbar_slot: 0 })
      const packet = transaction.create()
      client.pp = packet
      client.queue(transaction.name, packet)

      
      const viewer = new bedrockViewer.bedrock()
    }
  })
})()
