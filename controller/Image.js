const Image = require("../models/images")
const fs = require("fs")
const path = require("path")
const send = require("koa-send")
const User = require("../models/users")
// const hash = require("../utils")

function deleteByPath(path) {
  // 删除源文件
  fs.unlink(path, function (err) {
    if (err) throw err
    // if no error, file has been deleted successfully
    // console.log('File deleted!');
  })
}

class ImageController {
  async find(ctx) {
    ctx.body = await Image.find().populate("name", "path")
  }

  async create(ctx) {
    const user = await User.findById(ctx.state.user._id)
    const file = ctx.request.files.avatar
    // 直接用文件名做哈希，容易冲突，用时间戳吧
    // 同一时间传入怎么办？加上用户名，甚至不用哈希。。
    console.log(user.name, Date.now)
    // 前缀
    const name = user.name + Date.now()
    // 取后缀
    const type = file.name.split(".").pop()

    // 读取文件流
    const stream = fs.createReadStream(file.path)

    stream.on("error", function (err) {
      console.log(err)
    })

    const filePath = path.parse(file.path)
    // TODO 根据来源不同设置不同 dir
    const fileResource = filePath.dir + "/" + `${name}.${type}`

    /*
    使用 createWriteStream 写入数据，然后使用管道流pipe拼接
    */
    const writeStream = fs.createWriteStream(fileResource)

    // TOOD 除了 finish，可能还有出错等状态，需要处理
    stream.pipe(writeStream).on("finish", () => {
      deleteByPath(file.path)
    })

    ctx.body = {
      // url: `localhost:4000/api/images/${name}.${type}`,
      url: `https://jie1203.com/api/images/${name}.${type}`,
      code: 0,
      message: "上传成功",
    }
  }

  async getImgByName(ctx) {
    const name = ctx.params.name
    console.log("name", name)
    const path = `public/upload/${name}`
    ctx.attachment(path)
    await send(ctx, path)
  }
}

module.exports = new ImageController()
