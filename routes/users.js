module.exports = ({ userRouter }) => {
    // getting the home route
    userRouter.get("/", async (ctx, next) => {
    // const result = await ctx.db.collection("users").insert({ name: "haha" })
        let users = await ctx.db
        .collection("users")
        .find()
        .toArray()
        ctx.body = users
        // ctx.status = 200
    })

    userRouter.post("/", async (ctx, next) => {
        // console.log(ctx.request)
        let { username, pass, password } = ctx.request.body
        console.log(username, password, pass)
        ctx.body = 'pass'
    })
  }