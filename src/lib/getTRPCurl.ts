import { inDevEnvironment } from "./devEnv";

export const getTRPCurl = ()=>{
    if(inDevEnvironment){
         return "http://localhost:3000/api/trpc"
    }
     return "https://dashing-rolypoly-364f58.netlify.app/api/trpc"
}