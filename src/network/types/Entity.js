/**
 * Represents a vector in 3D space.
 * @typedef {Object} Vec3
 * @property {number} x - The x-coordinate of the vector.
 * @property {number} y - The y-coordinate of the vector.
 * @property {number} z - The z-coordinate of the vector.
 */

class Entity {
  /**
   *
   * @param {BigInt} unique_id
   * @param {BigInt} runtime_id
   * @param {String} entity_type
   * @param {Vec3} position
   * @param {Vec3} velocity
   * @param {Number} pitch
   * @param {Number} yaw
   * @param {Number} head_yaw
   * @param {Number} body_yaw
   * @param {Array} attributes
   * @param {Array} metadata
   * @param {Object} properties
   * @param {Array} link
   */
  constructor (
    uniqueId, runtimeId, entityType,
    position, velocity, pitch,
    yaw, headYaw, bodyYaw,
    attributes, metadata, properties,
    links
  ) {
    this.unique_id = uniqueId
    this.runtime_id = runtimeId
    this.entity_type = entityType
    this.position = position
    this.velocity = velocity
    this.pitch = pitch
    this.yaw = yaw
    this.head_yaw = headYaw
    this.body_yaw = bodyYaw
    this.attributes = attributes
    this.metadata = metadata
    this.properties = properties
    this.links = links
  }

  /**
   *
   * @returns {Number}
   */
  getUniqueId () {
    return this.unique_id
  }

  /**
   *
   * @returns {Number}
   */
  getRuntimeId () {
    return this.runtime_id
  }

  /**
   *
   * @returns {String}
   */
  getType () {
    return this.entity_type
  }

  /**
   *
   * @returns {Vec3}
   */
  getPosition () {
    return this.position
  }

  /**
   *
   * @returns {Vec3}
   */
  getVelocity () {
    return this.velocity
  }

  /**
   *
   * @returns {Number}
   */
  getPitch () {
    return this.pitch
  }

  /**
   *
   * @returns {Number}
   */
  getYaw () {
    return this.yaw
  }

  /**
   *
   * @returns {Number}
   */
  getHeadYaw () {
    return this.head_yaw
  }

  /**
   *
   * @returns {Number}
   */
  getBodyYaw () {
    return this.body_yaw
  }

  /**
   *
   * @returns {Array}
   */
  getAttributes () {
    return this.attributes
  }

  /**
   *
   * @returns {Array}
   */
  getMetaData () {
    return this.metadata
  }

  /**
   *
   * @returns {Array}
   */
  getProperties () {
    return this.properties
  }

  /**
   *
   * @returns {Array}
   */
  getLinks () {
    return this.links
  }

  /**
   *
   * @returns {String}
   */
  getNameTag () {
    return this.metadata?.find(item => item.key === 'nametag')?.value ?? 'Not found'
  }

  /**
   *
   * @returns {Number}
   */
  getHealth () {
    return this.attributes.find(attr => attr.name === 'minecraft:health')?.value ?? null
  }

  /**
   *
   * @param {Any} value
   */
  getMetaDataValue (value) {
    return this.metadata?.find(item => item.name === value)?.value ?? null
  }

  /**
   *
   * @returns {Object}
   */
  getFlags () {
    return this.attributes?.find(item => item.key === 'flags')?.value
  }
}

module.exports = { Entity }
