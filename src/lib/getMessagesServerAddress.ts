import { inDevEnvironment } from "./devEnv";

export const getMessagesServerAddress = (): string => {
  if (inDevEnvironment) {
    if (typeof process.env.NEXT_PUBLIC_CHAT_SERVER_ADDRESS === "string") {
      console.log("NEXT CHA SERVER ADDRESS IS: ",process.env.NEXT_PUBLIC_CHAT_SERVER_ADDRESS)
      return process.env.NEXT_PUBLIC_CHAT_SERVER_ADDRESS;
    }
  } else if (typeof process.env.NEXT_PUBLIC_CHAT_SERVER_ADDRESS === "string") {
    return process.env.NEXT_PUBLIC_CHAT_SERVER_ADDRESS;
  }

  console.log("No address for messages server defined!!!")
  return ""
};
