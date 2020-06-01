const jwt = require("koa-jwt")
const Router = require("koa-router")
const router = new Router({
  prefix: "/api/drafts",
})
const {
  find,
  create,
  draftById,
  updateDraft,
} = require("../controller/Draft")
const secret = require("../config")

const auth = jwt({
  secret
})

router.get("/", find)
router.post("/", auth, create)
router.get("/:id", draftById)
router.post("/:id", auth, updateDraft)

module.exports = router