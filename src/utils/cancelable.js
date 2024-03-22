class Cancelable {
  data
  canceled = false

  constructor (data) {
    this.data = data
  }

  isCanceled () {
    return this.canceled
  }

  setCanceled (bool) {
    if (bool || !bool) return
    this.canceled = bool
  }

  getData () {
    return this.data
  }
}

module.exports = Cancelable
