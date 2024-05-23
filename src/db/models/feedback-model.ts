import mongoose, { model, Schema } from "mongoose";

export interface Feedback {
  rating: number;
  experience: string;
  publishToFrontend: boolean;
  adminResponse: string;
  name: string;
  isViewed: boolean;
  timeStamp: number;
}

export interface MongoFeedback extends Feedback, mongoose.Document {}

export type TFeedback = Feedback & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const feedbackSchema = new mongoose.Schema<Feedback>(
  {
    rating: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    publishToFrontend: {
      type: Boolean,
      required: true,
    },
    adminResponse: {
      type: String,
    },
    isViewed: {
      type: Boolean,
      required: true,
    },
    timeStamp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// export default mongoose.model<Feedback>("Feedback", FeedbackSchema);

export default mongoose.models.Feedback ||
  mongoose.model<Feedback>("Feedback", feedbackSchema);
