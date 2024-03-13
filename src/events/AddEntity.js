const { Entity } = require("../network/types/Entity")

/** @type {import("../../types/events/Event").Event} */
module.exports = {
    name: 'add_entity',
    once: false,
    execute: async (params, client) => {
        client.addEntity(new Entity(params.unique_id, params.runtime_id, params.entity_type, params.position, params.velocity, params.pitch, params.yaw, params.head_yaw, params.body_yaw, params.attributes, params.metadata, params.properties, params.links))
    }
  }
  