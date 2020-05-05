const mongoose = require("mongoose")

const {
  Schema,
  model
} = mongoose

const articleSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  title: {
    type: String,
    required: true
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
    required: true
  },
  content: {
    type: String,
    required: true
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

module.exports = model("Article", articleSchema);