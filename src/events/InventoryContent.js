/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'inventory_content',
  once: false,
  execute: async (params, client) => {
    if (params.window_id === 'inventory') {
      const inventoryItems = params.input.filter(item => item)

      let i = 0
      inventoryItems.forEach(item => {
        client.inventory.setItem(item, i)
        i++
      })
    }
    params = undefined
  }
}
