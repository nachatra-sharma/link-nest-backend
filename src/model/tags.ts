import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema(
  {
    tag: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => {
          const allowedTag = ['youtube', 'social_media', 'website', 'link']
          return value.every((v) => allowedTag.includes(v))
        },
        message: 'Invalid tag value(s)',
      },
    },
  },
  {
    timestamps: true,
  }
)

const Tag = mongoose.model('Tag', TagSchema)

export default Tag
