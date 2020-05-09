const Router = require("koa-router")
const router = new Router({
  prefix: "/api/topics",
})
const {
  find,
  create,
  topicById
} = require("../controller/Topic")

router.get("/", find)
router.post("/", create)
router.get("/:id", topicById)

module.exports = router