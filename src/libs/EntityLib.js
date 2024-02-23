const { Vec3 } = require('vec3')
const { fromNotchianPitch, fromNotchianYaw } = require('../utils/conversions')

/** @param {import("../../types/index").BedrockRat} client */
module.exports = (client) => {
  client.entity = {
    position: new Vec3(client.data.position.x, client.data.position.y, client.data.position.z),
    velocity: new Vec3(0, 0, 0),
    onGround: false,
    isInWater: false,
    isInLava: false,
    isInWeb: false,
    isCollidedHorizontally: false,
    isCollidedVertically: false,
    pitch: fromNotchianPitch(client.data.pitch),
    yaw: fromNotchianYaw(client.data.yaw),
    effects: [],
    height: 1.62
  }

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
