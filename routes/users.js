// const userCtrl = require("../controller/User")

// module.exports = ({ userRouter }) => {
//   // getting the home route
//   // userRouter.get("/", async (ctx, next) => {
//   // const result = await ctx.db.collection("users").insert({ name: "haha" })
//   // let users = await ctx.db
//   // .collection("users")
//   // .find()
//   // .toArray()
//   // ctx.body = users

//   // ctx.status = 200
//   // })

//   userRouter.get("/", userCtrl.users)
//   userRouter.post("/", userCtrl.createUser)

//   // userRouter.post("/", async (ctx, next) => {
//   //     // console.log(ctx.request)
//   //     let { username, password } = ctx.request.body
//   //     console.log(username, password)
//   //     ctx.body = 'pass'
//   // })
// }

const Router = require("koa-router")
const router = new Router({ prefix: "/users" })
const {
  find
} = require("../controllers/users")

router.get("/", find)

module.exports = router