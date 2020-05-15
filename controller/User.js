const User = require("../models/users")
const jsonwebtoken = require("jsonwebtoken")
const secret = require("../config")

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

  async login(ctx) {
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
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, "用户名或密码不正确")
    }
    const {
      _id,
      name
    } = user
    const token = jsonwebtoken.sign({
      _id,
      name
    }, secret, {
      expiresIn: "1d"
    })
    ctx.body = {
      token
    }
  }
}

module.exports = new UserController()