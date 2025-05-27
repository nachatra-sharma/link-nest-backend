import mongoose from 'mongoose'

const connectToDB = async (uri: string | undefined) => {
  if (!uri) {
    throw new Error('Database URI is not valid')
  }
  try {
    await mongoose.connect(uri + 'linknest')
    console.log('Successfully connected to mongodb')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default connectToDB
