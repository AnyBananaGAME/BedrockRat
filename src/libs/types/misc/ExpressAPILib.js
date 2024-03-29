const express = require('express')
const path = require('path')
const { Vec3 } = require('vec3')
const http = require('http')
const bodyParser = require('body-parser')

/** @param {import("../../../../types/index").BedrockRat} client */
module.exports = (client) => {
  client.express = () => {
    const app = express()
    const port = 30002
    client.app = app

    app.use(express.json())
    app.use(bodyParser.json({ limit: '510mb' }))
    app.use(bodyParser.urlencoded({ limit: '510mb', extended: true }))

    app.get('/api/data', (req, res) => {
      const inventory = client.inventory.slots
      res.json(inventory)
    })
    app.get('/api/container', (req, res) => {
      res.json(client.data.container.window_id)
    })
    app.get('/api/getPosition', (req, res) => {
      res.json(client.entity.position)
    })
    app.post('/api/getBlock', (req, res) => {
      const blockPos = req.body
      const block = client.world.getBlock(
        new Vec3(blockPos.x, blockPos.y, blockPos.z)
      )
      res.json(block)
    })
    app.post('/api/getBlocks', async (req, res) => {
      const blocks = req.body
      const data = []
      await blocks.forEach(blockPosition => {
        const block = client.world.getBlock(
          new Vec3(blockPosition.x, blockPosition.y, blockPosition.z)
        )
        block.position = blockPosition
        data.push(block)
      })
      res.json(JSON.stringify(data))
    })
    app.post('/api/getEntities', async (req, res) => {
      const { radius } = req.body
      const entities = []
      client.findEntities(radius).forEach(entity => {
        entities.push({ unique_id: entity.unique_id.toString(), position: entity.position, entity_type: entity.entity_type })
      })

      res.json(JSON.stringify(entities))
    })

    const staticFilesDir = path.join(__dirname, '../../../utils/public')
    app.use(express.static(staticFilesDir))

    app.listen(port, () => {
      console.log(`[http://localhost:${port}] ${new Date().toISOString()}`)
    })

    if(client.viewer){
      const WebSocket = require('ws')
      const server = http.createServer(app)
      const wss = new WebSocket.Server({ server })
      wss.on('connection', (ws) => {
        console.log('A client connected')
        client.on('pre_player_auth_input', (event) => {
          if (ws) {
            const { x, y, z } = event.data.position
            const { yaw, pitch } = event.data
            ws.send(`${JSON.stringify({ type: 'position', position: { x, y, z } })}`)
            ws.send(`${JSON.stringify({ type: 'head', yaw, pitch })}`)
          }
        })
  
        ws.on('message', async (message) => {
          message = Buffer.from(message).toString('utf-8')
          console.log('Received:', message)
          const data = JSON.parse(message)
  
          switch (data.type) {
            case 'getBlock': {
              const pos = new Vec3(data.position.x, data.position.y, data.position.z)
              const block = client.world.getBlock(pos)
              ws.send(JSON.stringify({ type: 'blockResponse', block, position: data.position }))
              break
            }
            default:
              break
          }
        })
  
        ws.on('close', () => {
          console.log('Client disconnected')
        })
      })
      server.listen(3000, () => {
        console.log('Server is running on port 3000')
      })
    }
  }
  client.once('spawn', () => {
    client.express()
  })
}
