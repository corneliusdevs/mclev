import {io } from "socket.io-client"
import { getMessagesServerAddress } from "@/lib/getMessagesServerAddress";

// const socket = io(getMessagesServerAddress())
console.log("this is messages server address ", getMessagesServerAddress())
export const socket = io("http://localhost:3001")