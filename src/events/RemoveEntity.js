/** @type {import("../../types/events/Event").Event} */
module.exports = {
    name: "remove_entity",
    once: false,
    execute: async (params, client) => {
        client.removeEntity(params.entity_id_self)
    }
  }
  