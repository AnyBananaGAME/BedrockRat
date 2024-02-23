/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'set_entity_motion',
  once: false,
  execute: async (params, client) => {
    if (params.runtime_entity_id !== client.data.runtime_entity_id) {
      return
    }
    client.playerState.vel.set(params.velocity.x, params.velocity.y, params.velocity.z)
  }
}
