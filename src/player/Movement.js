/* eslint no-case-declarations: "error" */

const { Vec3 } = require('vec3')
const { toNotchianYaw, toNotchianPitch } = require('../Utils/conversions')
const { PlayerAuthInput } = require('../network/packets/PlayerAuthInput')
const Cancelable = require('../utils/Cancelable')

/** @param {import("../../types/index").BedrockRat} client */
module.exports = (client, playerState) => {
  let pPos = new Vec3(client.data.position.x, client.data.position.y, client.data.position.z)

  client.pMovements = {
    forward: false,
    back: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
    sneak: false
  }

  return {
    send: async (intendedMovement) => {
      const position = client.playerState.pos.clone().offset(0, 1.621, 0)
      const yaw = toNotchianYaw(client.playerState.yaw)
      const pitch = toNotchianPitch(client.playerState.pitch)
      switch (client.startGameData.movement_authority) {
        case 'client':
          client.queue('move_player', {
            runtime_id: client.data.runtime_entity_id,
            position,
            pitch,
            yaw,
            head_yaw: yaw,
            mode: 'normal',
            on_ground: client.playerState.onGround,
            tick: client.data.tick
          })
          break
        case 'server':
          const moveVec = { x: 0, z: 0 }
          moveVec.x += intendedMovement.left ? 1 : 0
          moveVec.x -= intendedMovement.right ? 1 : 0
          moveVec.z += intendedMovement.forward ? 1 : 0
          moveVec.z -= intendedMovement.back ? 1 : 0

          const flags = {}
          if (intendedMovement.forward) flags.up = true
          if (intendedMovement.back) flags.down = true
          if (intendedMovement.left) flags.left = true
          if (intendedMovement.right) flags.right = true
          if (intendedMovement.sprint) {
            if (intendedMovement.sprint !== client.pMovements.sprint) {
              flags[`${intendedMovement.sprint ? 'start' : 'stop'}_sprinting`] = true
            }
            flags.sprinting = true
            flags.sprint_down = true
          }
          if (intendedMovement.sneak) {
            if (intendedMovement.sneak !== client.pMovements.sneak) {
              flags[`${intendedMovement.sneak ? 'start' : 'stop'}_sneaking`] = true
            }
            flags.sneaking = true
            flags.sneak_down = true
          }
          if (intendedMovement.jump) {
            if (playerState.jumpTicks === 10) {
              flags.start_jumping = true
            }
            flags.jumping = true
            flags.jump_down = true
          }

          const packet = new PlayerAuthInput(client, undefined)
          packet.data.position = position
          packet.data.move_vector = moveVec
          packet.data.analogue_move_vector = moveVec
          packet.data.pitch = pitch
          packet.data.yaw = yaw
          packet.data.head_yaw = yaw
          packet.data.delta = position.clone().subtract(pPos)
          packet.data.input_data = flags

          const data = packet.create()
          const Event = new Cancelable(data)
          await client.emit('pre_player_auth_input', Event)

          client.queue('player_auth_input', Event.data)
          break
      }
      client.pMovements = intendedMovement
      pPos = position
    },
    tick: () => {
      if (client.playerState.teleportTicks !== 0) {
        client.playerState.teleportTicks--
      }
      client.emit('physicsTick')
      return client.data.tick
    }
  }
}
