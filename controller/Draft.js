const Draft = require("../models/drafts")


class DraftController {
  async find(ctx) {
    ctx.body = await Draft.find()
      .populate('topics', 'name')
  }

  async create(ctx) {
    const draft = await new Draft({
      ...ctx.request.body,
      author: ctx.state.user._id
    }).save()
    ctx.body = draft
  }

  async draftById(ctx) {
    const draft = await Draft.findById(ctx.params.id)
      .populate('topics', 'name')
      .populate('author', 'name')

    ctx.body = draft
  }

  async updateDraft(ctx) {
    const filter = {
      _id: ctx.params.id,
      author: ctx.state.user._id
    }

    const draft = await Draft.findOneAndUpdate(filter, ctx.request.body, {
      new: true
    }).populate('topics', 'name').populate('author', 'name')

    ctx.body = draft
  }
}

module.exports = new DraftController()