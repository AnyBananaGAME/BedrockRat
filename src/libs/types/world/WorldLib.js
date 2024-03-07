const { Vec3 } = require('vec3')

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

    setColumnAt: (pos, collumn) => {
      client.data.world.columns[`${pos.x >> 4}:${pos.z >> 4}`] = collumn
    },

    getColumnAt: (pos) => {
      pos = Object.assign({}, pos)
      const column = client.data.world.columns[`${pos.x >> 4}:${pos.z >> 4}`]
      return column
    }

  }
}
