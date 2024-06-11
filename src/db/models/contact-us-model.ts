import mongoose from "mongoose";


export interface ContactUsType {
    name: string;
    email: string;
    subject: string;
    phoneNumber?: string;
    message: string;
    isViewed: Boolean;
    timeStamp: number;
}


export interface MongoUser extends ContactUsType, mongoose.Document {}

export type TContactUs = ContactUsType & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};

const ContactUsSchema = new mongoose.Schema<ContactUsType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    isViewed: {
        type: Boolean,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    timeStamp: {
        type: Number,
        required: true
    }
}, {timestamps: true});

export default mongoose.models.Contactus || mongoose.model<ContactUsType>("Contactus", ContactUsSchema)