const Router = require("koa-router")
const router = new Router({
  prefix: "/api/images",
})
const {
  find,
  create,
} = require("../controller/Image")

router.get("/", find)
router.post("/", create)

module.exports = router