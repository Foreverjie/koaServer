const Router = require("koa-router")
const router = new Router({
  prefix: "/api/users"
})
const {
  find,
  create,
  login,
  updatePassword,
} = require("../controller/User")
const secret = require("../config")
const jwt = require("koa-jwt")

const auth = jwt({
  secret
})

router.get("/", auth, find)
router.post("/", auth, create)
router.post("/login", login)
router.post("/update", auth, updatePassword)

module.exports = router