/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'level_chunk',
  once: false,
  execute: async (params, client) => {
    const ChunkColumn = require('prismarine-chunk')(client.registry)
    const column = new ChunkColumn({ x: params.x, z: params.z })
    const payload = Buffer.from(params.payload)

    await column.networkDecodeNoCache(payload, params.sub_chunk_count)
    client.data.world.columns[`${params.x}:${params.z}`] = column; 
  }
}
