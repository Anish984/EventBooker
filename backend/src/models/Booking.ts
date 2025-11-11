
import mongoose, { Schema, Document, mongo } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  status:string;
  bookingDate: Date;
}

const bookingSchema = new Schema<IBooking>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  status:{type:String,enum:['pending','approved','rejected'],default:'pending'},
  bookingDate: { type: Date, default: Date.now },

});

export default mongoose.model<IBooking>("Booking", bookingSchema);
