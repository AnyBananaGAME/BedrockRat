/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'inventory_slot',
  once: false,
  execute: async (params, client) => {
    if (params.window_id === 'inventory') {
      client.inventory.setItem(params.item, params.slot)
    }
  }
}
