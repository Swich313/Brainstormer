import cors from 'cors'
import express from 'express'

import { type AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import { env } from './lib/env'

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
    applyPassportToExpressApp(app, ctx)
    await applyTrpcToExpressApp(app, ctx, trpcRouter)

    app.listen(env.PORT, () => {
      console.info(`Example app listening on port http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
