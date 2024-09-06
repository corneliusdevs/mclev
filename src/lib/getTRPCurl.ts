import { inDevEnvironment, isRunningInKubernates } from "./devEnv";

// returns url of where trpc requests are forwarded to
export const getTRPCurl = () => {
  let url = "";
  // If In the server
  if (inDevEnvironment && process.env.NEXT_PUBLIC_FALLBACK_TRPC_API_URL) {
    url = process.env.NEXT_PUBLIC_FALLBACK_TRPC_API_URL;
  } else if (process.env.NEXT_PUBLIC_TRPC_API_URL) {
    url = process.env.NEXT_PUBLIC_TRPC_API_URL;
  }

  // if we are in the browser
  if (typeof window !== 'undefined') {
    // In the browser
    if(typeof window.location?.origin && typeof window.location?.origin )
    url = `${window.location.origin}/api/trpc`;
  }

  if(url === "" || typeof url !== "string"){
    url = "http://localhost:3000/api/trpc"
  }

  return url;
};
