import { inDevEnvironment } from "./devEnv";

export const getMessagesServerAddress = (): string => {
  if (inDevEnvironment) {
    if (typeof process.env.MESSAGES_SERVER_ADDRESS_LOCALHOST === "string") {
      return process.env.MESSAGES_SERVER_ADDRESS_LOCALHOST;
    }
  } else if (typeof process.env.MESSSAGES_SERVER_ADDRESS === "string") {
    return process.env.MESSSAGES_SERVER_ADDRESS;
  }

  console.log("No address for messages server defined!!!")
  return ""
};
