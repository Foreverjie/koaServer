class UserController {
    static async users(ctx) {
        let users = await ctx.db
        .collection("users")
        .find()
        .toArray()
        ctx.body = users
    }

    static async createUser(ctx) {
        let {username, password} = ctx.request.body
        let user = await ctx.db.collection("users").insertOne({username, password})
        ctx.body = user
    }
}

module.exports = UserController