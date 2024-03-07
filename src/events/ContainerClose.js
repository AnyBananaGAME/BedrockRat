/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'container_close',
  once: false,
  execute: async (params, client) => {
    if (params.window_type === 'inventory') return

    client.data.container = undefined
  }
}
