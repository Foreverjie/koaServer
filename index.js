// app.js
const Koa = require("koa")
const koaBody = require("koa-body")
const parameter = require("koa-parameter")
const routing = require("./routes")
const logger = require("koa-logger")
const mongoose = require("mongoose")
const cors = require("@koa/cors")

const app = new Koa()

app.use(cors())
app.use(
  koaBody({
    multipart: true,
  })
)

mongoose.connect("mongodb://localhost:27017/koa-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
// db.once("open", function () {
//   console.log("mongodb connected")
// })

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

app.use(parameter(app))
routing(app)

app.listen(4000, () => console.log("Running at port 4000"))