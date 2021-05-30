const Image = require("../models/images")
const fs = require("fs")
const path = require("path")
// const send = require("koa-send")
const User = require("../models/users")
const mime = require("mime-types")
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
    // TODO 401 删除上传文件
    const user = await User.findById(ctx.state.user._id)
    // if (adminUser.type !== "0") {
    //   ctx.throw(403, "无权限")
    // }
    const files = ctx.request.files
    // 回传 URL
    const url = []
    for (let i = 0; i < Object.keys(files).length; i++) {
      const key = Object.keys(files)[i]
      console.log(key, files[key])

      const file = files[key]
      // 直接用文件名做哈希，容易冲突，用时间戳吧
      // 同一时间传入怎么办？加上用户名，甚至不用哈希。。
      // console.log(user.name, Date.now)
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
      // 检查文件夹是否存在？
      if (!fs.existsSync(filePath.dir + "/" + key)) {
        fs.mkdirSync(filePath.dir + "/" + key)
      }
      const fileResource = filePath.dir + "/" + key + "/" + `${name}.${type}`

      /*
      使用 createWriteStream 写入数据，然后使用管道流pipe拼接
      */
      const writeStream = fs.createWriteStream(fileResource)

      // TOOD 除了 finish，可能还有出错等状态，需要处理
      stream.pipe(writeStream).on("finish", () => {
        deleteByPath(file.path)
      })

      url.push(`https://jie1203.com/api/images/${key}/${name}.${type}`)
    }

    ctx.body = {
      // url: `localhost:4000/api/images/${name}.${type}`,
      // url: `https://jie1203.com/api/images/${name}.${type}`,
      url,
      code: 0,
      message: "上传成功",
    }
  }

  async getImgByName(ctx) {
    const name = ctx.params.name
    console.log("name", name)
    const path = `public/upload/${name}`
    const mimeType = mime.lookup(path)
    const src = fs.createReadStream(path)
    ctx.response.set("content-type", mimeType)
    ctx.body = src
    // ctx.attachment(path)
    // await send(ctx, path)
  }
}

module.exports = new ImageController()
