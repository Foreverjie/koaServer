const mongoose = require("mongoose")

const {
  Schema,
  model
} = mongoose

const draftSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  title: {
    type: String,
  },
  // select: boolean值, 指定是否被投影
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    select: false
  },
  desc: {
    type: String,
  },
  content: {
    type: String,
  },
  topics: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Topic"
    }]
  },
}, {
  timestamps: true
});

module.exports = model("Draft", draftSchema)