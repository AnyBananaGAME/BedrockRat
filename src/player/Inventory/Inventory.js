class Inventory {
  slots = new Array(36).fill(null)
  type = 'unknown'
  inventorySlotsRange = { start: 0, end: 36 }
  selectedItem = null

  constructor () {
    this.inventoryStart = this.inventorySlotsRange.start
    this.inventoryEnd = this.inventorySlotsRange.end + 1
  }

  setItem (item, slot) {
    this.slots[slot] = item
  }

  addItem () {

  }

  getItemBySlot (slot) {

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
}
module.exports = { Inventory }
