const Router = require("koa-router")
const router = new Router({
  prefix: "/users"
})
const {
  find,
  create,
  login
} = require("../controller/User")

router.get("/", find)
router.post("/", create)
router.post("/login", login)

module.exports = router