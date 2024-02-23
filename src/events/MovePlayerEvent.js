const { fromNotchianYaw, fromNotchianPitch } = require('../utils/conversions')

module.exports = {
  name: 'move_player',
  once: false,
  execute: async (params, client) => {
    if (params.runtime_id !== parseInt(client.data.runtime_entity_id) && params.mode === 'teleport') {
      return
    }
    const position = client.data.position
    position.x = Number(params.position.x)
    position.y = Number(params.position.y)
    position.z = Number(params.position.z)

    client.playerState.teleportTicks = 5
    client.playerState.pos.set(params.position.x, params.position.y - 1.621, params.position.z)
    client.playerState.yaw = fromNotchianYaw(params.yaw)
    client.playerState.pitch = fromNotchianPitch(params.pitch)
  }
}
