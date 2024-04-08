import dbConnect from "./mongoose";

const connectToDb = async () => {
    console.log("calling connect");
    await dbConnect();
  };

export default connectToDb