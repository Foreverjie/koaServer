const mongo = require("koa-mongo")

class ArticleController {
  static async articles(ctx) {
    let articles = await ctx.db
      .collection("articles")
      .find()
      .toArray()
    ctx.body = articles
  }

  static async article(ctx) {
    const {id} = ctx.params
    let articles = await ctx.db
      .collection("articles")
      .find({
        _id: mongo.ObjectId(id)
      })
      .toArray()
    ctx.body = articles
  }

  static async addArticle(ctx) {
    let {
      title,
      desc
    } = ctx.request.body
    let article = await ctx.db
      .collection("articles")
      .insertOne({
        title,
        desc
      })
    ctx.body = article.ops
  }
}

module.exports = ArticleController