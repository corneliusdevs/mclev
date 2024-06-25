import { io } from "socket.io-client";
import { getMessagesServerAddress } from "@/lib/getMessagesServerAddress";

// const socket = io(getMessagesServerAddress())
console.log("this is messages server address ", getMessagesServerAddress());
// export const socket = io("http://localhost:3021")

export const socket = io("http://localhost:3021", { autoConnect: false, reconnectionDelayMax: 10000 });

// export const socket = io("https://mclevchatserver.adaptable.app", { autoConnect: false, reconnectionDelayMax: 10000 })

// export const socket = io("https://mclevchatserver.adaptable.app", { autoConnect: false, reconnectionDelay: 1000, reconnectionDelayMax: 10000 })

// catch all listener which is very helpfull in development
socket.onAny((event, ...args) => {
  console.log(event, args);
});

// export const socket = io("http://localhost:3021")
