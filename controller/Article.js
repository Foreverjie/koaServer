class ArticleController {
  static async articles(ctx) {
    let articles = await ctx.db
      .collection("articles")
      .find()
      .toArray()
    ctx.body = articles
  }

  static async addArticle(ctx) {
    // let { username, password } = ctx.request.body
    // let user = await ctx.db
    //   .collection("users")
    //   .insertOne({ username, password })
    ctx.body = user
  }
}

module.exports = ArticleController
