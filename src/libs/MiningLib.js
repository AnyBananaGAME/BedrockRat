const { ClientAuthInput } = require('../network/packets/ClientAuthInput')
const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))
const util = require('util')

/** @param {import("../../types/index").BedrockRat} client */
module.exports = (client) => {
  client.mine = async (position) => {
    return new Promise((resolve, reject) => {
      let tick = client.data.tick

      const x = position.x
      const y = position.y
      const z = position.z

      const stop = tick + 5

      const actions1 = [{ action: 'start_break', position: { x, y, z }, face: 3 }, { action: 'crack_break', position: { x, y, z }, face: 2 }]

      const data = calculatePitchAndYaw(client.data.position, position)
      client.data.yaw = data.yaw
      client.data.pitch = data.pitch

      console.log(data.pitch)

      const packet = new ClientAuthInput(client, actions1, position)
      client.queue('player_auth_input', packet.create())

      const cracks = setInterval(async () => {
        if (++tick < stop) {
          const actions2 = [{ action: 'crack_break', position: { x, y, z }, face: 2 }]

          const packet2 = new ClientAuthInput(client, actions2, position)
          client.queue('player_auth_input', packet2.create())
        } else {
          clearInterval(cracks)
          const actions3 = [{ action: 'stop_break' }, { action: 'crack_break', position: { x, y, z }, face: 2 }]

          const packet3 = new ClientAuthInput(client, actions3, position, true)
          console.log(util.inspect(packet3.create(), { showHidden: false, depth: null, colors: true }))
          await sleep(50)
          resolve()
        }
      }, 50)
      console.log('Finished queueing packets')
    })
  }
}

/**
 * Calculate PitchAndYaw. This is not accurate i think but helps
 *
 * @param {{x: number, y: number, z: number}} playerPosition
 * @param {{x: number, y: number, z: number}} blockPosition
 * @returns {{pitch: number, yaw: number}}
 */
function calculatePitchAndYaw (playerPosition, blockPosition) {
  const dx = blockPosition.x - playerPosition.x
  const dy = blockPosition.y - playerPosition.y
  const dz = blockPosition.z - playerPosition.z

  const yaw = Math.atan2(dz, dx) * (180 / Math.PI)

  const horizontalDistance = Math.sqrt(dx * dx + dz * dz)
  const pitch = -Math.atan2(dy, horizontalDistance) * (180 / Math.PI)

  return { pitch, yaw }
}