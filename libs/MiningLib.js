const { ClientAuthInput } = require('../network/packets/ClientAuthInput')

module.exports = (client) => {
  client.mine = async (position) => {
    let tick = client.data.tick

    const x = position.x
    const y = position.y
    const z = position.z

    const stop = tick + 5

    const actions1 = [{ action: 'start_break', position: { x, y, z }, face: 3 }, { action: 'crack_break', position: { x, y, z }, face: 3 }]

    const packet = new ClientAuthInput(client, actions1, position)
    client.queue('player_auth_input', packet.create())

    const cracks = setInterval(() => {
      if (++tick < stop) {
        const actions2 = [{ action: 'crack_break', position: { x, y, z }, face: 3 }]

        const packet2 = new ClientAuthInput(client, actions2, position)
        client.queue('player_auth_input', packet2.create())
      } else {
        clearInterval(cracks)
        const actions3 = [{ action: 'stop_break' }, { action: 'crack_break', position: { x, y, z }, face: 3 }]

        const packet3 = new ClientAuthInput(client, actions3, position, true)
        client.queue('player_auth_input', packet3.create())
      }
    }, 50)
    console.log('Finished queueing packets')
  }
}
