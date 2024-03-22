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
      client.inventory.onOpen()
    } else {
      if (client.data.container?.window_id) {
        const container = client.data.container

        const inventoryItems = params.input.filter(item => item)

        let i = 0
        inventoryItems.forEach(item => {
          container.setItem(item, i)
          i++
        })
        client.data.container.onOpen()
      }
    }
  }
}
