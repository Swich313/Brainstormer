import cors from 'cors'
import express from 'express'

import { type AppContext, createAppContext } from './lib/ctx'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

const corsOption = {
  origin: '*',
}

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const app = express()
    const port = 3000

    app.use(cors(corsOption))

    app.get('/ping', (req, res) => {
      res.json('pong')
    })

    applyTrpcToExpressApp(app, ctx, trpcRouter)

    app.listen(port, () => {
      console.info(`Example app listening on port http://localhost:${port}`)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
