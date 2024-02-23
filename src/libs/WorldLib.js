const { Vec3 } = require('vec3')

/** @param {import("../../types/index").BedrockRat} client */
module.exports = (client) => {
  const Block = require('prismarine-block')(client.registry)
  client.world = {

    getBlock: (pos) => {
      pos = Object.assign({}, pos)
      const column = client.data.world.columns[`${pos.x >> 4}:${pos.z >> 4}`]
      if (!column) {
        return Block.fromStateId(client.registry.blocksByName.air.defaultState, 0)
      }

      const b = column.getBlock({ x: pos.x & 0xf, y: pos.y + 64, z: pos.z & 0xf })
      b.position = new Vec3(pos.x, pos.y, pos.z)
      return b
    }

  }
}
