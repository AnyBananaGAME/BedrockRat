class PlayerAuthInput {
  constructor (client, blockAction = undefined) {
    this.client = client
    this.block_action = blockAction
    this.face = 3

    const pos = this.client.data.position

    this.data = {
      pitch: this.client.data.pitch,
      yaw: this.client.data.yaw,
      position: { x: pos.x, y: pos.y, z: pos.z },
      move_vector: { x: 0, z: 0 },
      head_yaw: this.client.data.yaw,
      input_data: {
        _value: 0,
        ascend: false,
        descend: false,
        north_jump: false,
        jump_down: false,
        sprint_down: false,
        change_height: false,
        jumping: false,
        auto_jumping_in_water: false,
        sneaking: false,
        sneak_down: false,
        up: false,
        down: false,
        left: false,
        right: false,
        up_left: false,
        up_right: false,
        want_up: false,
        want_down: false,
        want_down_slow: false,
        want_up_slow: false,
        sprinting: false,
        ascend_block: false,
        descend_block: false,
        sneak_toggle_down: false,
        persist_sneak: true,
        start_sprinting: false,
        stop_sprinting: false,
        start_sneaking: false,
        stop_sneaking: false,
        start_swimming: false,
        stop_swimming: false,
        start_jumping: false,
        start_gliding: false,
        stop_gliding: false,
        item_interact: false,
        block_action: false,
        item_stack_request: false,
        handled_teleport: false,
        emoting: false,
        missed_swing: false,
        start_crawling: false,
        stop_crawling: false,
        start_flying: false,
        stop_flying: false,
        received_server_data: false,
        client_predicted_vehicle: false
      },
      input_mode: 'touch',
      play_mode: 'screen',
      interaction_model: 'touch',
      gaze_direction: undefined,
      tick: BigInt(this.client.data.tick),
      delta: { x: 0, y: -0.07840000092983246, z: 0 },
      transaction: undefined,
      item_stack_request: undefined,
      predicted_vehicle: undefined,
      block_action: this.block_action,
      analogue_move_vector: { x: 0, z: 0 }
    }
  }

  create () {
    return this.data
  }
}

module.exports = { PlayerAuthInput }
