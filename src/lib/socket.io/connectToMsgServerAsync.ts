import { io } from "socket.io-client";
import { getMessagesServerAddress } from "@/lib/getMessagesServerAddress";

class SocketManager {
  private static instance: SocketManager;
  private socket: ReturnType<typeof io> | null = null;

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }

    return SocketManager.instance;
  }

  public async getSocket(): Promise<ReturnType<typeof io>> {
    if (!this.socket) {
      const url = await this.waitForChatServerAddress();
      this.socket = io(url, {
        reconnectionDelayMax: 10000,
      });

      // catch all listener which is very helpful in development
      this.socket.onAny((event, ...args) => {
        console.log(event, args);
      });
    }

    return this.socket;
  }

  private async waitForChatServerAddress(): Promise<string> {
    return new Promise((resolve, reject) => {

      const fetchChatServerUrl = async () => {
        const url = (await this.fetchChatServerAddress()).chatServerAddress;

        console.log("did not wait for request");
        if (url) {
          return url;
        }

        return this.getChatServerAddress();
      };

      fetchChatServerUrl()
        .then((url) => {
          if (typeof url === "string" && url !== "") {
            resolve(url);
          } else {
            resolve(this.getChatServerAddress());
          }
        })
        .catch((err) => {
          console.log(
            "error fetching chat server address. using fallback address ",
            err
          );
          resolve(this.getChatServerAddress());
        });

    });
  }

  private async fetchChatServerAddress(): Promise<{
    chatServerAddress: string;
  }> {
    const response = await fetch("/api/getChatServerAddress");
    const { chatServerAddress } = await response.json();

    return {
      chatServerAddress: chatServerAddress
        ? chatServerAddress
        : this.getChatServerAddress(),
    };
  }

  private getChatServerAddress = (): string => {
    //store the chat server address in this variable
    let chatServerAddress = "";

    console.log("executing get chat server address 1", process.env.NODE_ENV);
    // check if chat server address is not undefined
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_FALLBACK_MESSAGES_SERVER_ADDRESS_LOCALHOST
    ) {
      chatServerAddress =
        process.env.NEXT_PUBLIC_FALLBACK_MESSAGES_SERVER_ADDRESS_LOCALHOST;
      console.log("executing get chat server address 2", chatServerAddress);
    } else if (
      typeof process.env.NEXT_PUBLIC_FALLBACK_CHAT_SERVER_ADDRESS !==
      "undefined"
    ) {
      chatServerAddress = process.env.NEXT_PUBLIC_FALLBACK_CHAT_SERVER_ADDRESS;
      console.log("executing get chat server address 3", chatServerAddress);
    }

    console.log("executing get chat server address 4 ", chatServerAddress);
    return chatServerAddress;
  };

  public isSocketConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const getSocketInstance = async (): Promise<ReturnType<typeof io>> => {
  return SocketManager.getInstance().getSocket();
};

export const isSocketConnected =  ():boolean => {
  return SocketManager.getInstance().isSocketConnected()
};
