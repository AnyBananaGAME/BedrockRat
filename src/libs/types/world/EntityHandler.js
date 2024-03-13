const fs = require('fs');
const { Entity } = require('../../../network/types/Entity');

/** @param {import("../../../../types/index").BedrockRat} client */
module.exports = (client) => {
    const entities = client.data.entities;

    /**
     * Add an entity to entity list;
     * @param  {Entity} entity 
     */
    client.addEntity = (entity) => {
        client.data.entities[entity.getRuntimeId()] = entity;
    }   
    /**
     * Remove an entity from the entity list;
     * @param  {String} runtimeId 
     */
    client.removeEntity = (runtimeId) => {
        client.data.entities[runtimeId] = undefined;
    } 

    /**
     * Find entities within a given radius around a position
     * @param {Object} position - The position to check around
     * @param {number} radius - The radius to search within
     * @returns {Entity[]} - An array of entities within the radius
     */
    client.findEntities = (radius) => {
        const entitiesInRange = [];
        const position = client.entity.position;
        const radiusSquared = radius * radius;

        for (const entity of Object.values(entities)) {
            const dx = entity.position.x - position.x;
            const dy = entity.position.y - position.y;
            const dz = entity.position.z - position.z;
            const distanceSquared = dx * dx + dy * dy + dz * dz;

            if (distanceSquared <= radiusSquared) {
                entitiesInRange.push(entity);
            }
        }
    
        return entitiesInRange;
    }
}
