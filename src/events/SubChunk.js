// Took this example from https://github.com/Flonja/Physics
// It was a well made one so used it myself.

/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'subchunk',
  once: false,
  execute: async (params, client) => {
    const ChunkColumn = require('prismarine-chunk')(client.registry)

    client.SubChunkSection = (offset) => {
      const { x, y, z } = calculateCoordinates(params.origin, offset)
      const column = client.data.world.columns[`${x}:${z}`] || (client.data.world.columns[`${x}:${z}`] = new ChunkColumn({ x, z }))

      const collumtSection = column.sections[y] || (column.sections[y] = new column.Section(column.registry, column.Block, { y, subChunkVersion: column.subChunkVersion }))
      return collumtSection
    }

    const packetEntries = params.entries || []
    for (const subChunkEntry of packetEntries) {
      if (subChunkEntry.result !== 'success') continue

      const subChunk = client.SubChunkSection({ x: subChunkEntry.dx, y: subChunkEntry.dy, z: subChunkEntry.dz })
      subChunk.decode(2, Buffer.from(subChunkEntry.payload))
    }
  }
}

function calculateCoordinates (origin, offset) {
  const x = origin.x + offset.x
  const y = (origin.y + offset.y) >> 4
  const z = origin.z + offset.z
  return { x, y, z }
}
