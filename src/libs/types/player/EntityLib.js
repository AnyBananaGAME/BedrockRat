const { Vec3 } = require('vec3')
const { fromNotchianPitch, fromNotchianYaw } = require('../../../utils/conversions')

class EntityLib {
  position
  velocity = new Vec3(0, 0, 0)
  onGround = false
  isInWater = false
  isInLava = false
  isInWeb = false
  isCollidedHorizontally = false
  isCollidedVertically = false
  pitch
  yaw
  effects = []
  height = 1.62

  constructor (client) {
    this.client = client
    this.position = new Vec3(this.client.data.position.x, this.client.data.position.y, this.client.data.position.z)
    this.pitch = fromNotchianPitch(this.client.data.pitch)
    this.yaw = fromNotchianYaw(this.client.data.yaw)

    client.controls = {
      forward: false,
      back: false,
      left: false,
      right: false,
      jump: false,
      sprint: false,
      sneak: false
    }
  }

  set () {
    this.client.entity = this
  }
}
module.exports = { EntityLib }
