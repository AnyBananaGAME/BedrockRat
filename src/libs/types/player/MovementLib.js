const { Inventory } = require('../../../player/Inventory/Inventory')

/** @param {import("../../../../types/index").BedrockRat} client */
module.exports = (client) => {
    client.once("spawn", () => {
        const pos = client.startGameData.player_position
        client.data.runtime_entity_id = client.startGameData.runtime_entity_id
        client.data.position = { x: pos.x, y: pos.y - 1.621, z: pos.z }
    
        client.playerState = new PlayerState(client, client.controls)
        client.playerState.teleportTicks = 5
        const movement = require('../../../player/Movement')(client, client.playerState)
        client.movement = movement
    
        client.clearControlStates = function () {
          movement.send(client.controls)
        }
    })
    
}
