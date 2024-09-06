import { NextResponse } from "next/server";

export async function GET(request: Request) {
  
  const chatServerAddress = process.env.CHAT_SERVER_ADDRESS
  const fallbackChatServerAddress = process.env.NEXT_PUBLIC_FALLBACK_CHAT_SERVER_ADDRESS
  
  let result = ""
  
  if(chatServerAddress){
      result = chatServerAddress
    }else if(fallbackChatServerAddress){
        result = fallbackChatServerAddress
    }

    console.log("executing get request for chatServerAddress ", result)

    return NextResponse.json({ chatServerAddress: result });
}
