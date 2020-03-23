module.exports = ({ router }) => {
  // getting the home route
  router.get("/", async (ctx, next) => {
    // const result = await ctx.db.collection("users").insert({ name: "haha" })
    let users = await ctx.db
      .collection("users")
      .find()
      .toArray()
    ctx.body = users
  })
}
