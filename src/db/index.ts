import mongoose from 'mongoose'

const connectToDB = async (uri: string | undefined) => {
  if (!uri) {
    throw new Error('Database URI is not valid')
  } else {
    await mongoose
      .connect(uri + 'linknest')
      .then(() => console.log('Successfully connected to mongoose'))
      .catch(() =>
        console.log('Something went wrong while connecting to database')
      )
  }
}

export default connectToDB
