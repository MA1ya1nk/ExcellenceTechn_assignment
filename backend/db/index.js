import mongoose from "mongoose";

const connectDB = async() => {
   try{
      const databaseConnected = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      console.log(databaseConnected.connection.host)
   } catch{
     process.exit(1)
   }
}

export default connectDB