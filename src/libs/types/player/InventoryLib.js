const { Inventory } = require('../../../player/Inventory/Inventory')

/** @param {import("../../../../types/index").BedrockRat} client */
module.exports = (client) => {
  client.inventory = new Inventory()
}
