import { SelectedOptionWithAnswers } from "@/helpers/updateSelectedOptions";
import mongoose, { model, Schema } from "mongoose";
import { string } from "zod";

export interface Booking {
  name: string;
  phoneNumber: string;
  email: string;
  postcode: string;
  prefferedDate: string;
  prefferedTime: string;
  additionalNotes?: string;
  selectedService: string;
  bookingInfo: SelectedOptionWithAnswers[],
  isRead: boolean,
  status: string,
  timeStamp: number;
}

export interface MongoUser extends Booking, mongoose.Document {}

export type TBooking = Booking & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const BookingSchema = new mongoose.Schema<Booking>({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  prefferedDate: {
    type: String,
    required: true,
  },
  prefferedTime: {
    type: String,
    required: true,
  },
  selectedService:{
    type: String,
    required: true,
  },
  bookingInfo:{
    type: [{
      question: String,
      answers: [String]
    }],
    required: true
  },
  additionalNotes:{
    type: String,
  },
  isRead:{
    type: Boolean,
    required: true,
  },
  status:{
    type: String,
    required: true,
  },
  timeStamp:  {
    type: Number,
    required: true
  },
}, {timestamps: true});

// export default mongoose.model<User>("Booking", UserSchema);

export default mongoose.models.Booking ||
  mongoose.model<Booking>("Booking", BookingSchema);
