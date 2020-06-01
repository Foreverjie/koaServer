const Article = require("../models/articles")


class ArticleController {
  async find(ctx) {
    ctx.body = await Article.find()
      .populate('topics', 'name')
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

  async articleById(ctx) {
    const article = await Article.findById(ctx.params.id)
      .populate('topics', 'name')
      .populate('author', 'name')

    ctx.body = article
  }

  async updateArticle(ctx) {
    const filter = {
      _id: ctx.params.id,
      author: ctx.state.user._id
    }

    const article = await Article.findOneAndUpdate(filter, ctx.request.body, {
      new: true
    }).populate('topics', 'name').populate('author', 'name')

    ctx.body = article
  }
}

module.exports = new ArticleController()