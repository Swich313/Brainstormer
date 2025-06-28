import cors from 'cors'
import express from 'express'

import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

const app = express()
const port = 3000

app.use(cors())

app.get('/ping', (req, res) => {
  res.json('pong')
})

applyTrpcToExpressApp(app, trpcRouter)

app.listen(port, () => {
  console.info(`Example app listening on port http://localhost:${port}`)
})
