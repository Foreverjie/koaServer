const Image = require("../models/Images")
const mime = require('mime-types')
const fs = require('fs')

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
    try {
      const file = ctx.request.files.avatar
      const { key, url } = await uploadFile({
        fileName: file.name,
        filePath: file.path,
        fileType: file.type,
      });
    } catch(err) {
      console.log(`error ${err.message}`)
    }
  }
}

module.exports = new ImageController()