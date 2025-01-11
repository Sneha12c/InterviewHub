import mongoose from "mongoose";

const dbconnect = async function(){
    try {
      const connection = await mongoose.connect(process.env.MONGODB_URL);
      console.log("mongodb connected successfuly");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
}

export default dbconnect;
