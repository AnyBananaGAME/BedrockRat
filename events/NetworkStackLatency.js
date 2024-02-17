/** @type {import("../types/events/Event").Event} */
module.exports = {
  name: 'network_stack_latency',
  once: false,
  execute: async (params, client) => {
    const TimeStamp = BigInt(params.timestamp.toString() + '000000')

    client.queue('network_stack_latency', {
      timestamp: BigInt(TimeStamp),
      needs_response: params.needs_response
    })
  }
}
