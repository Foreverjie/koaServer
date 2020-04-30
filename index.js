// app.js
const Koa = require("koa")
const koaBody = require("koa-body")
const parameter = require("koa-parameter")
// const Router = require("koa-router")
const routing = require("./routes")
const logger = require("koa-logger")
// const mongo = require("koa-mongo")
const mongoose = require("mongoose")
const cors = require("@koa/cors")

const app = new Koa()

app.use(cors())
app.use(
  koaBody({
    multipart: true,
  })
)

mongoose.connect("mongodb://localhost:27017/articles", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
// db.once("open", function () {
//   console.log("mongodb connected")
// })

// app.use(
//   mongo({
//     host: "localhost",
//     port: 27017,
//     db: "koa-db",
//     authSource: "",
//     max: 100,
//     min: 1,
//     acquireTimeoutMillis: 100,
//   })
// )

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
// const router = new Router()
// const dogRouter = new Router({
//   prefix: "/dogs",
// })
// const userRouter = new Router({
//   prefix: "/users",
// })
// const articleRouter = new Router({
//   prefix: "/articles",
// })
// // require our external routes and pass in the router
// require("./routes/basic")({
//   router,
// })
// require("./routes/dogs")({
//   dogRouter,
// })
// require("./routes/users")({
//   userRouter,
// })
// require("./routes/articles")({
//   articleRouter,
// })

// app.use(router.routes())
// app.use(router.allowedMethods())
// app.use(dogRouter.routes())
// app.use(dogRouter.allowedMethods())
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(articleRouter.routes())
// app.use(articleRouter.allowedMethods())

app.use(parameter(app))
routing(app)

app.listen(4000, () => console.log("Running at port 4000"))
