// class UserController {
//     static async users(ctx) {
//         let users = await ctx.db
//         .collection("users")
//         .find()
//         .toArray()
//         ctx.body = users
//     }

//     static async createUser(ctx) {
//         let {username, password} = ctx.request.body
//         let user = await ctx.db.collection("users").insertOne({username, password})
//         ctx.body = user
//     }
// }

// module.exports = UserController

const User = require("../models/users")

class UserController {
    async find(ctx) {
        ctx.body = await User.find()
    }

    async create(ctx) {
        ctx.verifyParams({
            name: {
                type: "string",
                required: true
            },
            password: {
                type: "string",
                required: true
            }
        })
        const {
            name
        } = ctx.request.body;
        const repeatedUser = await User.findOne({
            name
        })
        if (repeatedUser) {
            ctx.throw(409, "用户名已存在")
        }
        const user = await new User(ctx.request.body).save()
        ctx.body = user
    }
}

module.exports = new UserController()