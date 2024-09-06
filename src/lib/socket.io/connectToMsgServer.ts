// import { io } from "socket.io-client";
// // import config from "@/configs/chatServerAddress"

// const getChatServerAddress = (): string => {
//   //store the chat server address in this variable
//   let chatServerAddress = "";

//   // check if chat server address is not undefined
//   if (
//     process.env.NODE_ENV !== "development" &&
//     process.env.NEXT_PUBLIC_FALLBACK_MESSAGES_SERVER_ADDRESS_LOCALHOST
//   ) {
//     chatServerAddress =
//       process.env.NEXT_PUBLIC_FALLBACK_MESSAGES_SERVER_ADDRESS_LOCALHOST;
//   } else {
//      console.log("this is chat server address config ",)
//   }

//   return chatServerAddress;
// };

// // url of chat server
// let url = getChatServerAddress();


// export const socket = io(url, {
//   autoConnect: true,
//   reconnectionDelayMax: 10000,
// });

// // export const socket = io("https://mclevchatserver.adaptable.app", { autoConnect: false, reconnectionDelay: 1000, reconnectionDelayMax: 10000 })

// // // catch all listener which is very helpfull in development
// // socket.onAny((event, ...args) => {
// //   console.log(event, args);
// // });

// // export const socket = io("http://localhost:3021")
