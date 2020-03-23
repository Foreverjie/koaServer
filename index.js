// app.js
const Koa = require("koa")
const Router = require("koa-router")
const logger = require("koa-logger")
const mongo = require("koa-mongo")

const app = new Koa()

app.use(
  mongo({
    host: "localhost",
    port: 27017,
    db: "koa-db",
    authSource: "",
    max: 100,
    min: 1,
    acquireTimeoutMillis: 100
  })
)

app.use(logger())

// error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit("error", err, ctx)
  }
})

// instantiate our new Router
const router = new Router()
const dogRouter = new Router({ prefix: "/dogs" })
// require our external routes and pass in the router
require("./routes/basic")({ router })
require("./routes/dogs")({ dogRouter })

app.use(router.routes())
app.use(router.allowedMethods())
app.use(dogRouter.routes())
app.use(dogRouter.allowedMethods())

const server = app.listen(3000)
module.exports = server
