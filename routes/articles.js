const articleCtrl = require("../controller/Article")

module.exports = ({
  articleRouter
}) => {
  articleRouter.get("/", articleCtrl.articles)
  articleRouter.post("/", articleCtrl.addArticle)
}