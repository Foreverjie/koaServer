const Article = require("../models/articles")

class ArticleController {
  async find(ctx) {
    ctx.body = await Article.find()
  }

  async create(ctx) {
    ctx.verifyParams({
      title: {
        type: "string",
        required: true
      },
      desc: {
        type: "string",
        required: true
      },
      content: {
        type: "string",
        required: true
      }
    })
    const article = await new Article({
      ...ctx.request.body,
      author: ctx.state.user._id
    }).save()
    ctx.body = article
  }
}

module.exports = new ArticleController()