import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const user = process.env.mongodb_user
const password = process.env.mongodb_password



async function connectDB() {
  try {
    await mongoose.connect(`mongodb+srv://${user}:${password}@spark-cluster.bqite.mongodb.net/`);
    console.log("Mongo DB Connected");

   

  } catch (error) {
    console.log(error);
  }
}





  

export default connectDB;