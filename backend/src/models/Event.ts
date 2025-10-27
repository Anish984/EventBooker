import mongoose from "mongoose";

const { Schema, model, Document } = mongoose;

export interface IEvent extends Document {

    title: string;
    description: string;
    date: Date;
    address: string;
    organizer: mongoose.Schema.Types.ObjectId;
    attendees: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
const eventSchema = new Schema<IEvent>({

    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default: [] }],
    updatedAt: { type: Date }
},
{ timestamps: true });  

export default model<IEvent>('Event', eventSchema);