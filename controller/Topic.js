const Topic = require("../models/topics")

class TopicController {
  async find(ctx) {
    ctx.body = await Topic.find()
  }

  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: "string",
        required: true
      },
      introduction: {
        type: "string",
        required: true
      },
    })
    const topic = await new Topic({
      ...ctx.request.body,
    }).save()
    ctx.body = topic
  }

  async topicById(ctx) {
    // const { fields } = ctx.query;
    // const selectFields =
    //   fields &&
    //   fields
    //     .split(";")
    //     .filter(f => f)
    //     .map(f => " +" + f)
    //     .join("")
    const topic = await Topic.findById(ctx.params.id)
    // .select(selectFields)
    // .populate("questioner topics")
    console.log(topic)

    ctx.body = topic
  }
}

module.exports = new TopicController()