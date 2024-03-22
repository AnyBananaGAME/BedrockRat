class ItemStackRequest {
  /**
     *
     * @param {import("../../../types").BedrockRat} client
     * @param {ACTION_TYPE_IDS} typeId
     * @param {SLOT_TYPES} sourceSlotType
     * @param {SLOT_TYPES} destinationSlotType
     * @param {Number} count
     * @param {Number} slotFrom
     * @param {Number} slotTo
     */
  constructor (client, typeId = ACTION_TYPE_IDS.PLACE, sourceSlotType = SLOT_TYPES.HOTBAR_AND_INVENTORY, destinationSlotType = SLOT_TYPES.CONTAINER, count, slotFrom, slotTo) {
    this.client = client
    this.type_id = typeId
    this.count = count
    this.source_slot_type = sourceSlotType
    this.slot_from = slotFrom
    this.slot_to = slotTo
    this.destination_slot_type = destinationSlotType

    let stackId
    if (sourceSlotType === SLOT_TYPES.HOTBAR_AND_INVENTORY) {
      stackId = client.inventory.getItem(slotFrom).stack_id
    } else {
      stackId = client.data.container.getItem(slotFrom).stack_id
    }

    this.data = {
      requests: [{
        request_id: client.data.request_id,
        actions: [{
          type_id: this.type_id,
          count: this.count,
          source: {
            slot_type: this.source_slot_type,
            slot: this.slot_from,
            stack_id: stackId
          },
          destination: {
            slot_type: 'container',
            slot: this.destination_slot_type,
            stack_id: 0
          }
        }
        ],
        custom_name: [],
        cause: -1
      }]

    }
  }

  create () {
    return this.data
  }
}

class SLOT_TYPES {
  static HOTBAR_AND_INVENTORY = 'hotbar_and_inventory'
  static CONTAINER = 'container'
}
class ACTION_TYPE_IDS {
  static PLACE = 'place'
}
module.exports = { ItemStackRequest, SLOT_TYPES, ACTION_TYPE_IDS }
