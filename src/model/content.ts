import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    content_type: {
      type: mongoose.Types.ObjectId,
      ref: 'Tag',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Content = mongoose.model('Content', contentSchema)
export default Content
