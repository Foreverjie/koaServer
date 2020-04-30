const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  // __v: { type: Number, select: false },
  name: { type: String, required: true },
  // select: boolean值, 指定是否被投影
  password: { type: String, required: true },
  avatar_url: { type: String },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
    required: true
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: "Topic" }]
  },
  likingAnswers: {
    type: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
  },
  dislikingAnswers: {
    type: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
  },
  collectingAnswers: {
    type: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
  }
},
{ timestamps: true }
);

module.exports = model("User", userSchema);