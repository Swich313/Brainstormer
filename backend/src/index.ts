import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())

app.get('/ping', (req, res) => {
  res.json('pong')
})

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  }),
)

app.listen(port, () => {
  console.info(`Example app listening on port http://localhost:${port}`)
})
