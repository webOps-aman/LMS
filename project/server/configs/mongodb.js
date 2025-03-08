import mongoose from "mongoose";


//connect to the mongodb database
const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database Connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
    // await mongoose.connect(`${process.env.MONGODB_URI}/test`)
}

export default connectDB