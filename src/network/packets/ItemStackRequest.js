class ItemStackRequest {
    /**
     * 
     * @param {import("../../../types").BedrockRat} client 
     * @param {ACTION_TYPE_IDS} type_id 
     * @param {SLOT_TYPES} source_slot_type 
     * @param {SLOT_TYPES} destination_slot_type 
     * @param {Number} count 
     * @param {Number} slot_from 
     * @param {Number} slot_to 
     */
    constructor (client, type_id = ACTION_TYPE_IDS.PLACE, source_slot_type = SLOT_TYPES.HOTBAR_AND_INVENTORY, destination_slot_type = SLOT_TYPES.CONTAINER, count, slot_from, slot_to) {
      this.client = client
      this.type_id = type_id
      this.count = count
      this.source_slot_type = source_slot_type;
      this.slot_from = slot_from;
      this.slot_to = slot_to;
      this.destination_slot_type = destination_slot_type;

    let stack_id;
      if(source_slot_type === SLOT_TYPES.HOTBAR_AND_INVENTORY){
        stack_id = client.inventory.getItem(slot_from).stack_id;
      } else {
        stack_id = client.data.container.getItem(slot_from).stack_id;
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
                    stack_id: stack_id
                },
                destination: {
                    slot_type: "container",
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
    static HOTBAR_AND_INVENTORY = "hotbar_and_inventory"
    static CONTAINER = 'container'
} 
class ACTION_TYPE_IDS {
    static PLACE = 'place'
}
module.exports = { ItemStackRequest, SLOT_TYPES, ACTION_TYPE_IDS }
  