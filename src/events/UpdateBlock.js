/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'update_block',
  once: false,
  execute: async (params, client) => {
    const column = client.data.world.columns[`${params.position.x >> 4}:${params.position.z >> 4}`]
    if (!column) return

    column.setBlockStateId({
      x: params.position.x & 0xf,
      y: params.position.y + 64,
      z: params.position.z & 0xf,
      l: params.layer
    },
    params.block_runtime_id
    )

    if (client.data.debug) console.log('[debug] UpdateBlockEvent => ' + params.block_runtime_id)
  }
}
