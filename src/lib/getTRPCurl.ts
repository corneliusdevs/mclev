import { inDevEnvironment, isRunningInKubernates } from "./devEnv";

// returns url of where trpc requests are forwarded to
export const getTRPCurl = () => {
  if (inDevEnvironment) {
    return "http://localhost:3000/api/trpc";
  }
  if (isRunningInKubernates) {
    // if app is running in kubernates, make sure to set the port in the url to match the port defined in the file used to deploy the app in kubernates. Port 32033 was used in the file used to deploy the app, hence it is specified in the url as http://localhost:32033/api/trpc
    return "http://localhost:32033/api/trpc";
  }

  // this is the address used route to trpc traffic to the api url where it is running. When running app else where, remember to set NEXT_PUBLIC_IS_RUNNING_IN_KUBERNATES environment variable to false.
  return "https://dashing-rolypoly-364f58.netlify.app/api/trpc";
};
