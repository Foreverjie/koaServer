const jwt = require("koa-jwt")
const Router = require("koa-router")
const router = new Router({
  prefix: "/api/articles",
})
const {
  find,
  create,
  articleById,
  updateArticle,
} = require("../controller/Article")
const secret = require("../config")

const auth = jwt({
  secret
})

router.get("/", find)
router.post("/", auth, create)
router.get("/:id", articleById)
router.post("/:id", auth, updateArticle)

module.exports = router