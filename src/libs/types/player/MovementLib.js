const { PlayerState } = require('prismarine-physics')
const { Vec3 } = require('vec3')
const { toNotchianYaw, toNotchianPitch } = require('../../../utils/conversions')
const { PlayerAuthInput } = require('../../../network/packets/PlayerAuthInput')
const Cancelable = require('../../../utils/Cancelable')

/** @param {import("../../../../types/index").BedrockRat} client */
module.exports = (client) => {
  client.once('spawn', () => {
    const pos = client.startGameData.player_position
    client.data.runtime_entity_id = client.startGameData.runtime_entity_id
    client.data.position = { x: pos.x, y: pos.y - 1.621, z: pos.z }

    client.playerState = new PlayerState(client, client.controls)
    client.playerState.teleportTicks = 5
    const movement = new Movement(client, client.playerState)
    client.movement = movement

    client.clearControlStates = function () {
      movement.send(client.controls)
    }
  })

  class Movement {
    pPos
    client
    playerState

    constructor (client, playerState) {
      this.pPos = new Vec3(client.data.position.x, client.data.position.y, client.data.position.z)
      this.client = client
      this.playerState = playerState

      client.pMovements = {
        forward: false,
        back: false,
        left: false,
        right: false,
        jump: false,
        sprint: false,
        sneak: false
      }
    }

    async send (intendedMovement) {
      const position = this.client.playerState.pos.clone().offset(0, 1.621, 0)
      const yaw = toNotchianYaw(this.client.playerState.yaw)
      const pitch = toNotchianPitch(this.client.playerState.pitch)

      switch (this.client.startGameData.movement_authority) {
        case 'client':
          this.client.queue('move_player', {
            runtime_id: this.client.data.runtime_entity_id,
            position,
            pitch,
            yaw,
            head_yaw: yaw,
            mode: 'normal',
            on_ground: this.client.playerState.onGround,
            tick: this.client.data.tick
          })
          break
        case 'server': {
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
            if (intendedMovement.sprint !== this.client.pMovements.sprint) {
              flags[`${intendedMovement.sprint ? 'start' : 'stop'}_sprinting`] = true
            }
            flags.sprinting = true
            flags.sprint_down = true
          }
          if (intendedMovement.sneak) {
            if (intendedMovement.sneak !== this.client.pMovements.sneak) {
              flags[`${intendedMovement.sneak ? 'start' : 'stop'}_sneaking`] = true
            }
            flags.sneaking = true
            flags.sneak_down = true
          }
          if (intendedMovement.jump) {
            if (this.playerState.jumpTicks === 10) {
              flags.start_jumping = true
            }
            flags.jumping = true
            flags.jump_down = true
          }

          const packet = new PlayerAuthInput(this.client, undefined)
          packet.data.position = position
          packet.data.move_vector = moveVec
          packet.data.analogue_move_vector = moveVec
          packet.data.pitch = pitch
          packet.data.yaw = yaw
          packet.data.head_yaw = yaw
          packet.data.delta = position.clone().subtract(this.pPos)
          packet.data.input_data = flags

          const data = packet.create()
          const Event = new Cancelable(data)
          await this.client.emit('pre_player_auth_input', Event)
          this.client.queue('player_auth_input', Event.data)
          this.client.emit('move', { position })
          break
        }
      }
      this.client.pMovements = intendedMovement
      this.pPos = position
    }

    tick () {
      if (this.client.playerState.teleportTicks !== 0) {
        this.client.playerState.teleportTicks--
      }
      this.client.emit('physicsTick')
      return this.client.data.tick
    }
  }
}
