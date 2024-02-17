module.exports = {
  name: 'move_player',
  once: false,
  execute: async (params, client) => {
    if (BigInt(params.runtime_id) !== client.data.runtime_entity_id) return
    if (params.mode !== 'teleport') return
    const position = client.data.position
    position.x = Number(params.position.x)
    position.y = Number(params.position.y)
    position.z = Number(params.position.z)
  }
}
