const axios = require("axios")

module.exports = ({ dogRouter }) => {
  // getting the dogs route
  dogRouter.get("/", async (ctx, next) => {
    let res = await axios.get("https://dog.ceo/api/breeds/list/all")
    ctx.body = res.data
  })
}
