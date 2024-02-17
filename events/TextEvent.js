/** @type {import("../types/events/Event").Event} */
module.exports = {
  name: 'text',
  once: false,
  execute: async (params, client) => {
    // This is for testing the mining
    if (params.message.includes('.')) {
      const position = client.data.position
      for (let x = 0; x < 5; x++) {
        for (let i = 1; i < 5; i++) {
          await client.mine({ x: position.x + x, y: position.y - 2, z: position.z - i })
        }
      }
    }
  }
}
