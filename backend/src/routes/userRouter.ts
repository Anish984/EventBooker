import {Router, Request, Response} from 'express';
import User from '../models/User';
import Event from '../models/Event';
import Booking from '../models/Booking';
import auth from '../middlewares/auth'
import upload from "../middlewares/multerStorage";
import cloudinary from "../utils/cloudinary";
import fs from "fs";
import mongoose from 'mongoose';
const router = Router();


//newEvent
router.post("/cancelEvent", auth, async (req: Request, res: Response): Promise<void> => {
  const { userId, EventId } = req.body;
  try {
    // 1️⃣ Find user
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // 2️⃣ Find booking for this user & event
    const booking = await Booking.findOne({ user: userId, event: EventId });
    if (!booking) {
      res.status(400).json({ message: "User is not registered for this event" });
      return;
    }

    // 3️⃣ Delete the booking
    await Booking.findByIdAndDelete(booking._id);

    // 4️⃣ Remove booking reference from user.bookings
    user.bookings = user.bookings.filter(
      (bookingId: any) => bookingId.toString() !== booking._id.toString()
    );
    await user.save();

    // 5️⃣ Remove user from event.attendees
    const event = await Event.findById(EventId);
    if (event) {
      event.attendees = event.attendees.filter(
        (attendeeId: any) => attendeeId.toString() !== userId
      );
      await event.save();
    }

    res.status(200).json({ message: "Event registration cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error cancelling registration", error: err });
  }
});




//registerNewEvent
router.post("/registerNewEvent",upload.single("idCard"),async (req: Request, res: Response): Promise<void> => {
    const { userId, EventId } = req.body;

    try {
      // 1️⃣ Validate User
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // 2️⃣ Validate Event
      const event = await Event.findById(EventId);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      // 3️⃣ Ensure arrays exist
      if (!Array.isArray(user.bookings)) user.bookings = [];
      if (!Array.isArray(event.attendees)) event.attendees = [];

      // 4️⃣ Upload image to Cloudinary (required)
      if (!req.file) {
        res.status(400).json({ message: "ID card image is required" });
        return;
      }

      const localPath = req.file.path;
      const uploadResult = await cloudinary.uploader.upload(localPath, {
        folder: "event-id-cards",
      });
      const idCardUrl = uploadResult.secure_url;
      fs.unlinkSync(localPath);

      // 5️⃣ Create new booking
      const newBooking = new Booking({
        user: userId,
        event: EventId,
        idCardUrl,
        status: "pending",
      });
      await newBooking.save();

      // 6️⃣ Link booking to user
      user.bookings.push(newBooking._id as mongoose.Types.ObjectId);
      await user.save();

      // 7️⃣ Add user to event attendees
      if (!event.attendees.some((id: any) => id.toString() === userId)) {
        event.attendees.push(userId);
        await event.save();
      }

      res.status(200).json({
        message: "Registered successfully",
        bookingId: newBooking._id,
        imageUrl: idCardUrl,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering for event", error: err });
    }
  }
);

//createEvent
router.post("/createEvent",auth,async(req:Request,res:Response) : Promise<void>=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const address = req.body.address;
        const organizer = req.body.organizer;
        
        const newEvent = new Event({
            title,
            description,
            date,
            address,
            organizer,
        });
        await newEvent.save();
        res.status(200).send({message:"successfully created",event:newEvent});
    }catch(err){
        res.status(500).json({message: "Error creating event", error: err});
    }
});
router.get("/getRegisteredEvents",auth,async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId

      const bookings = await Booking.find({ user: userId })
        .populate("event") // ✅ automatically replaces eventId with full event details
        .lean();

      const registeredEvents = bookings.map((b) => b.event);

      res.status(200).json(registeredEvents);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching registered events", error: err });
    }
  }
);


export default router;
