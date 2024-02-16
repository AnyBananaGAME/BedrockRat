const { ClientAuthInput } = require("../ClientAuthInput");
const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))
const util = require('util')

module.exports = (client) => {
    client.mine = async (position) => {
        let tick = client.data.tick;
        let client_position = client.data.position;

        let x = position.x;
        let y = position.y;
        let z = position.z;

        const stop = tick + 5;

        let actions1 = [ { action: 'start_break', position: { x: x, y: (y), z: z }, face: 3 }, { action: 'crack_break', position: { x: x, y: (y), z: z }, face: 3 } ]
        
        let packet = new ClientAuthInput(client, actions1, position);
        client.queue("player_auth_input", packet.create());

        const cracks = setInterval(() => {
            if (++tick < stop){
                let actions2 = [{ action: 'crack_break', position: { x: x, y: (y) , z: z }, face: 3}]
                
                let packet2 = new ClientAuthInput(client, actions2, position);
                client.queue("player_auth_input", packet2.create());
            }  else {
                clearInterval(cracks);
                let actions3 = [ { action: 'stop_break' }, { action: 'crack_break', position: { x: x, y: (y), z: z }, face: 3},]

                let packet3 = new ClientAuthInput(client, actions3, position, true);
                client.queue("player_auth_input", packet3.create());
            }
        }, 50)
        console.log("Finished queueing packets")
    }
}
