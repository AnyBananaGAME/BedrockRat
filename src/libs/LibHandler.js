const ExpressAPILib = require('./types/misc/ExpressAPILib')
const { EntityLib } = require('./types/player/EntityLib')
const EventHandlerLib = require('./types/player/EventHandlerLib')
const InventoryLib = require('./types/player/InventoryLib')
const MiningLib = require('./types/player/MiningLib')
const MovementLib = require('./types/player/MovementLib')
const EntityHandler = require('./types/world/EntityHandler')
const WorldLib = require('./types/world/WorldLib')

class LibHandler {
  constructor (client) {
    this.client = client
  }

  /**
     * Gonna handle libs like that. So they can be done in multiple ways.
     */
  async handle () {
    new EntityLib(this.client).set()
    EntityHandler(this.client)
    EventHandlerLib(this.client)
    WorldLib(this.client)
    ExpressAPILib(this.client)
    InventoryLib(this.client)
    MiningLib(this.client)
    MovementLib(this.client)
  }
}
module.exports = { LibHandler }
