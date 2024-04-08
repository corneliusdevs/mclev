import mongoose from "mongoose";
import {inDevEnvironment} from '../lib/devEnv'
import { getMongoUri } from "@/lib/getMongoUri";

declare global {
  var mongoose: any;
}

const MONGODB_URI = getMongoUri()

console.log("conncting", MONGODB_URI )

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if(!cached.promise){
    const opts = {
        bufferCommands: false,
    };
    if(MONGODB_URI){
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose)=>{
        return mongoose;
      });

    }else{
      throw new Error(
        "Cannot connect. Define the MONGODB_URI environment variable inside .env.local"
      );
    }
  }

  try{
    cached.conn = await cached.promise;
  }catch (error) {
    cached.promise = null;
    throw error
  }

   return cached.conn
}


export default dbConnect;
