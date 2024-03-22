class InventoryTransaction {
  name = 'inventory_transaction'

  legacy = {
    legacy_request_id: 0
  }

  transaction_type
  actions
  transaction_data

  /**
     *
     * @param {import("../../../types").BedrockRat} client
     * @param {TRANSACTION_TYPE} transaction_type
     * @param {Array} actions
     * @param {ACTION_TYPE} actionType
     * @param {Array} action_data
     */
  constructor (client, transactionType = 'item_use', actions = [], actionType = ACTION_TYPE.CLICK_BLOCK, actionData = { block_position: client.entity.position, hotbar_slot: 0 }) {
    this.client = client
    this.transaction_type = transactionType
    this.actions = actions

    if (actionType === ACTION_TYPE.CLICK_BLOCK) {
      this.transaction_data = {
        action_type: actionType,
        block_position: actionData.block_position,
        face: 2,
        hotbar_slot: actionData.hotbar_slot,
        held_item: client.inventory.getItem(actionData.hotbar_slot),
        player_pos: this.client.entity.position,
        click_pos: { x: 0.5, y: 0.5, z: 0.5 },
        block_runtime_id: 0 // On pocketmine it does not matter, i do not know about the BDS
      }
    }
  }

  setType (transactionType) {
    this.transaction_type = transactionType
  }

  setTransactionData (transactionData) {
    this.transaction_data = transactionData
  }

  setActions (actions) {
    this.actions = actions
  };

  create () {
    return {
      transaction: {
        legacy: this.legacy,
        transaction_type: this.transaction_type,
        actions: this.actions,
        transaction_data: this.transaction_data
      }
    }
  }
}

class ACTION_TYPE {
  static CLICK_BLOCK = 'click_block'
}
class TRANSACTION_TYPE {
  static ITEM_USE = 'item_use'
}
module.exports = { InventoryTransaction, ACTION_TYPE, TRANSACTION_TYPE }
