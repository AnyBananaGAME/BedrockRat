const Vec3 = require("vec3");

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
  constructor(
    unique_id, runtime_id, entity_type,
    position, velocity, pitch,
    yaw, head_yaw, body_yaw,
    attributes, metadata, properties,
    links
  ) {

    this.unique_id = unique_id;
    this.runtime_id = runtime_id;
    this.entity_type = entity_type;
    this.position = position;
    this.velocity = velocity;
    this.pitch = pitch;
    this.yaw = yaw;
    this.head_yaw = head_yaw;
    this.body_yaw = body_yaw;
    this.attributes = attributes;
    this.metadata = metadata;
    this.properties = properties;
    this.links = links;
  }
  /**
   *
   * @returns {Number}
   */
  getUniqueId() {
    return this.unique_id;
  }
  /**
   *
   * @returns {Number}
   */
  getRuntimeId() {
    return this.runtime_id;
  }
  /**
   *
   * @returns {String}
   */
  getType() {
    return this.entity_type;
  }
  /**
   *
   * @returns {Vec3}
   */
  getPosition() {
    return this.position;
  }
  /**
   *
   * @returns {Vec3}
   */
  getVelocity() {
    return this.velocity;
  }
  /**
   *
   * @returns {Number}
   */
  getPitch() {
    return this.pitch;
  }
  /**
   *
   * @returns {Number}
   */
  getYaw() {
    return this.yaw;
  }
  /**
   *
   * @returns {Number}
   */
  getHeadYaw() {
    return this.head_yaw;
  }
  /**
   *
   * @returns {Number}
   */
  getBodyYaw() {
    return this.body_yaw;
  }
  /**
   *
   * @returns {Array}
   */
  getAttributes() {
    return this.attributes;
  }
  /**
   *
   * @returns {Array}
   */
  getMetaData() {
    return this.metadata;
  }
  /**
   *
   * @returns {Array}
   */
  getProperties() {
    return this.properties;
  }
  /**
   *
   * @returns {Array}
   */
  getLinks() {
    return this.links;
  }
  /**
   *
   * @returns {String}
   */
  getNameTag() {
    return this.metadata?.find(item => item.key === 'nametag')?.value ?? 'Not found';
  }
  /**
   *
   * @returns {Number}
   */
  getHealth() {
    return this.attributes.find(attr => attr.name === 'minecraft:health')?.value ?? null;
  }

  /**
   * 
   * @param {Any} value 
   */ 
  getMetaDataValue(value){
    return this.metadata?.find(item => item.name === value)?.value ?? null;
  }
  /**
   *
   * @returns {Object}
   */
  getFlags() {
    return this.attributes?.find(item => item.key === "flags")?.value
  }
}

module.exports = { Entity }
