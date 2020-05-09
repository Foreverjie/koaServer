const jwt = require("koa-jwt")
const Router = require("koa-router")
const router = new Router({
  prefix: "/api/articles",
})
const {
  find,
  create,
  articleById
} = require("../controller/Article")
const secret = "asd"

const auth = jwt({
  secret
})

router.get("/", find)
router.post("/", auth, create)
router.get("/:id", articleById)

module.exports = router