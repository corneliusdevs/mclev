import mongoose from "mongoose";

export type Chat = {
  message: string;
  timeStamp: number;
  recipientsId: string[];
  author: "admin" | "client",
  chatId: string;
};

export interface Chats {
  userId: string;
  chats: Chat[];
  isRead: boolean;
}

export type TChats = Chats & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export interface MongoChats extends Chats, mongoose.Document {}

const ChatSchema = new mongoose.Schema<Chats>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  chats: [
    {
      message: {
        type: String,
        required: true
      },
      timeStamp:  {
        type: Number,
        required: true
      },
      recipientsId: {
        type: [String],
        required: true,
      },
      author: {
        type: String,
        required: true
      },
      chatId: {
        type: String,
        required: true
      },
    },
  ],
  isRead:{
    type: Boolean,
        required: true
  }
 
 
});

// export default mongoose.model<User>("Chats", UserSchema);

export default mongoose.models.Chats ||
  mongoose.model<Chats>("Chats", ChatSchema);
