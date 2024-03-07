const { Container } = require('../network/types/Container')

/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'container_open',
  once: false,
  execute: async (params, client) => {
    if (params.window_type === 'inventory') return

    const container = new Container(params.window_id, params.window_type, params.coordinates, params.runtime_entity_id)
    client.data.container = container
  }
}
