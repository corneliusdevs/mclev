import { inDevEnvironment } from "./devEnv";

export const getMongoUri = ()=>{
    // if(inDevEnvironment){
    //    return process.env.MONGODB_URI;
    // }
     return process.env.MONGODB_PROD_URI
}