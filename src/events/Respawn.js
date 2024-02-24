/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'respawn',
  once: false,
  execute: async (params, client) => {
    switch (params.state) {
      case 0:
        params.queue('respawn', {
          runtime_entity_id: params.runtime_entity_id,
          state: 2,
          position: params.position
        })
        break
      case 1:
        client.queue('player_action', {
          runtime_entity_id: params.runtime_entity_id,
          action: 7,
          position: { // i dont think it matters
            x: 0,
            y: 0,
            z: 0
          },
          result_position: {
            x: 0,
            y: 0,
            z: 0
          },
          face: -1
        })
        break
    }
  }
}
