const jwt = require("koa-jwt")
const Router = require("koa-router")
const router = new Router({
  prefix: "/articles",
})
const {
  find,
  create
} = require("../controller/Article")
const secret = "asd"

const auth = jwt({
  secret
})

router.get("/", find)
router.post("/", auth, create)

module.exports = router