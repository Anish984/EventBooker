import mongoose from "mongoose";

const { Schema, model, Document } = mongoose;

interface Iuser extends Document {

    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdEvents?: mongoose.Types.ObjectId[];
    registeredEvents?: mongoose.Types.ObjectId[];

}

const userSchema = new Schema<Iuser>({

    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],

    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }]

},
{ timestamps: true });

userSchema.pre('save', function (this: Iuser, next) {
    this.updatedAt = new Date();
    next();
});
const User = model<Iuser>('User', userSchema);

export default User;