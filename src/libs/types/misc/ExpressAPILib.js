const express = require('express')
const path = require('path')
/** @param {import("../../../../types/index").BedrockRat} client */
module.exports = (client) => {
  client.express = () => {
    const app = express()
    const port = 30001
    client.app = app;

    app.use(express.json())
    
    app.get('/api/data', (req, res) => {
      const inventory = client.inventory.slots
      res.json(inventory)
    })
    
    const staticFilesDir = path.join(__dirname, '../../../utils/public')
    app.use(express.static(staticFilesDir))

    app.listen(port, () => {
      console.log(`[http://localhost:${port}] ${new Date().toISOString()}`)
    })
  }
  client.once("spawn", () => {client.express()})
}
