const Image = require("../models/images")
const fs = require('fs')
const path = require('path')


function deleteByPath(path) {
    // 删除源文件
    fs.unlink(path, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      // console.log('File deleted!');
    });
}

class ImageController {
  async find(ctx) {
    ctx.body = await Image.find()
      .populate('name', 'path')
  }

  async create(ctx) {
    const file = ctx.request.files.avatar;
    console.log(file.path)

    // 读取文件流
    const stream = fs.createReadStream(file.path);

    stream.on("error", function(err) {
      console.log(err);
    });

    const filePath = path.parse(file.path);
    // TODO 根据来源不同设置不同 dir
    const fileResource = filePath.dir + '/' + `${file.name}`;

    /*
    使用 createWriteStream 写入数据，然后使用管道流pipe拼接
    */
    const writeStream = fs.createWriteStream(fileResource);

    stream.pipe(writeStream).on('finish', () => {
      deleteByPath(file.path);
    });

    ctx.body = {
      url: fileResource,
      code: 0,
      message: '上传成功'
    };
  }


}

module.exports = new ImageController()