const mongoose = require("mongoose")

const {
  Schema,
  model
} = mongoose

const imageSchema = new Schema({
  // __v: { type: Number, select: false },
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model("Image", imageSchema)