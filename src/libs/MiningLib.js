const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))
/** @param {import("../../types/index").BedrockRat} client */
module.exports = (client) => {
  client.mine = async (position) => {
    return new Promise((resolve, reject) => {
      let tick = client.data.tick

      const x = position.x
      const y = position.y
      const z = position.z

      const stop = tick + 5

      const temp = calculatePitchAndYaw(client.playerState.position, position)
      client.playerState.pitch = temp.pitch
      client.playerState.yaw = temp.yaw

      if (position.x > client.data.position.x + 5 || position.z > client.data.position.z + 5) {
        reject(new Error('The block is too far from the player.\nMax distance is 5 blocks.'))
      }

      const face = 0

      client.once('pre_player_auth_input', (eventTwo) => {
        const data = eventTwo.data
        data.block_action = [{ action: 'start_break', position: { x, y, z }, face }, { action: 'crack_break', position: { x, y, z }, face: 2 }]
        data.input_data.block_action = true
      })

      const cracks = setInterval(async () => {
        if (++tick < stop) {
          client.once('pre_player_auth_input', (cancelable) => {
            const data = cancelable.data

            data.block_action = [{ action: 'crack_break', position: { x, y, z }, face }]
            data.input_data.block_action = true
          })
        } else {
          clearInterval(cracks)
          client.once('pre_player_auth_input', (eventTwo) => {
            const data = eventTwo.data

            data.block_action = [{ action: 'stop_break' }, { action: 'crack_break', position: { x, y, z }, face }]
            data.input_data.block_action = true
            data.input_data.item_interact = true
            data.transaction = {
              legacy: {
                legacy_request_id: 0
              },
              actions: [],
              data: {
                action_type: 'break_block',
                block_position: { x, y, z },
                face,
                hotbar_slot: 0,
                held_item: { network_id: 0 },
                player_pos: client.data.position,
                click_pos: { x: 0, y: 0, z: 0 },
                block_runtime_id: 0
              }
            }
          })

          await sleep(50)
          resolve()
        }
      }, 50)
    })
  }
}

/**
 * Calculates pitch and yaw.
 * @param {Object} playerPosition - The player's position {x, y, z}.
 * @param {Object} blockPosition - The block's position {x, y, z}.
 * @returns {Object}
 */
function calculatePitchAndYaw (playerPosition, blockPosition) {
  const deltaX = blockPosition.x - playerPosition.x
  const deltaY = blockPosition.y - (playerPosition.y + 1.65)
  const deltaZ = blockPosition.z - playerPosition.z

  const angle = Math.atan2(deltaZ, deltaX)
  const degrees = angle * (180 / Math.PI)
  const direction = Math.round(((degrees + 180) % 360) / 90) % 4

  let yaw
  switch (direction) {
    case 0:
      yaw = 180 // South
      break
    case 1:
      yaw = 270 // West
      break
    case 2:
      yaw = 0 // North
      break
    case 3:
      yaw = 90 // East
      break
  }

  const horizontalDistance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ)
  const pitch = Math.atan2(deltaY, horizontalDistance) * (180 / Math.PI)
  return { pitch, yaw }
}
