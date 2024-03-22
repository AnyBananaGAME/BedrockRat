const { Vec3 } = require('vec3')
const { RaycastIterator } = require('../../../utils/iterators')

module.exports = (client) => {
  const Block = require('prismarine-block')(client.registry)

  /** @param {import("../../../../types/index").BedrockRat} client */
  client.world = {
    getData: () => {
      return client.data
    },

    getBlock: (pos) => {
      pos = Object.assign({}, pos)
      const column = client.data.world.columns[`${pos.x >> 4}:${pos.z >> 4}`]

      if (!column) {
        const bb = Block.fromStateId(client.registry.blocksByName.air.defaultState, 0)
        bb.position = new Vec3(pos.x, pos.y, pos.z)
        return bb
      }

      const b = column.getBlock({ x: pos.x & 0xf, y: pos.y + 64, z: pos.z & 0xf })
      b.position = new Vec3(pos.x, pos.y, pos.z)
      return b
    },
    setBlock: (pos, block) => {
      const column = client.world.getColumnAt(pos)
      column.setBlock({ x: pos.x, y: pos.y, z: pos.z }, block)
      return true
    },

    addColumn: (x, z, collumn) => {
      client.data.world.columns[`${x >> 4}:${z >> 4}`] = collumn
    },

    getColumn: (x, z) => {
      const column = client.data.world.columns[`${x >> 4}:${z >> 4}`]
      return column
    },
    getColumnAt: (pos) => {
      pos = Object.assign({}, pos)
      const column = client.data.world.columns[`${pos.x >> 4}:${pos.z >> 4}`]
      return column
    },
    raycast: async (from, direction, range, matcher = null) => {
      const iter = new RaycastIterator(from, direction, range)
      let pos = iter.next()

      while (pos) {
        const position = new Vec3(pos.x, pos.y, pos.z)
        const block = await client.world.getBlock(position)

        if (block && (!matcher || matcher(block))) {
          const intersect = iter.intersect(block.shapes, position)

          if (intersect) {
            block.face = intersect.face
            block.intersect = intersect.pos
            return block
          }
        }
        pos = iter.next()
      }
      return null
    }
  }
  client.world.columns = client.data.world.columns
}
