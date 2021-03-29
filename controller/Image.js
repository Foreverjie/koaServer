const Image = require("../models/Images")
const mime = require('mime-types')
const fs = require('fs')
const path = require('path')

const uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    console.log('stream', stream)

    stream.on("error", function(err) {
      reject(err);
    });
  });
};


class ImageController {
  async find(ctx) {
    ctx.body = await Image.find()
      .populate('name', 'path')
  }

  async create(ctx) {
    // try {
    //   const file = ctx.request.files.avatar
    //   const { key, url } = await uploadFile({
    //     fileName: file.name,
    //     filePath: file.path,
    //     fileType: file.type,
    //   });
    // } catch(err) {
    //   console.log(`error ${err.message}`)
    // }

    const file = ctx.request.files.avatar;
    // console.log(file)

    // fs.rename(file.path)

    // 读取文件流
    const stream = fs.createReadStream(file.path);

    stream.on("error", function(err) {
      reject(err);
    });

    const filePath = path.join(__dirname, '/public/upload/');
    // 组装成绝对路径
    // const fileResource = filePath + `${file.name}`;
    // 直接使用 绝对路径 
    const fileResource = file.path

    /*
    使用 createWriteStream 写入数据，然后使用管道流pipe拼接
    */
    const writeStream = fs.createWriteStream(fileResource);

    stream.pipe(writeStream);
    ctx.body = {
      url: fileResource,
      code: 0,
      message: '上传成功'
    };
  }
}

module.exports = new ImageController()