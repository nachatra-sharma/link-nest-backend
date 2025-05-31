import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => {
          const allowedTag = ['youtube', 'social_media', 'website', 'link']
          return allowedTag.includes(value)
        },
        message: 'Invalid tag value',
      },
    },
  },
  {
    timestamps: true,
  }
)

const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema)

export default Tag
