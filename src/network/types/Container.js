class Container {
  window_id
  window_type
  coordinates
  runtime_entity_id

  slots = new Array(36).fill(null)

  constructor (windowID, windowType, coordinates, runtimeEntityId) {
    this.window_id = windowID
    this.window_type = windowType
    this.coordinates = coordinates
    this.runtime_entity_id = runtimeEntityId
  }

  setItem (item, slot) {
    this.slots[slot] = item
  }

  /**
   * - Returns the item inside the slot
   * - Will return data if item does not exist there!
   * - The slots start at 0!
   * @param {Number} slot
   */
  getItem (slot) {
    if (isNaN(slot)) return {}

    return this.slots[slot]
  }

  itemsRange (start, end) {
    const results = []
    for (let i = start; i < end; ++i) {
      const item = this.slots[i]
      if (item) results.push(item)
    }
    return results
  }

  items () {
    return this.itemsRange(this.inventoryStart, this.inventoryEnd)
  }

  firstEmptySlotRange (start, end) {
    for (let i = start; i < end; ++i) {
      if (this.slots[i] === null) return i
    }
    return null
  }

  lastEmptySlotRange (start, end) {
    for (let i = end; i >= start; i--) {
      if (this.slots[i] === null) return i
    }
    return null
  }

  onOpen(){
    console.log("Container with the type of "+ this.window_type+' has been opened!');
  }
  onClose(){
    console.log("Container with the type of "+ this.window_id+' has been closed!');
  }
}

module.exports = { Container }
