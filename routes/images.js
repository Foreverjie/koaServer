const Router = require("koa-router")
const router = new Router({
  prefix: "/api/images",
})
const {
  find,
  create,
  getImgByName,
} = require("../controller/Image")
const secret = require("../config")
const jwt = require("koa-jwt")

const auth = jwt({
  secret
})

router.get("/", find)
router.post("/", auth, create)
router.get("/:name", getImgByName)

module.exports = router