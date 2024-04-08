import mongoose, { model, Schema } from "mongoose";

export interface Feedback {
  rating: number;
  experience: string;
}

export interface MongoFeedback extends Feedback, mongoose.Document {}

export type TFeedback = Feedback & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const feedbackSchema = new mongoose.Schema<Feedback>({
  rating: {
    type: Number,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

// export default mongoose.model<Feedback>("Feedback", FeedbackSchema);

export default mongoose.models.Feedback || mongoose.model<Feedback>("Feedback", feedbackSchema);
