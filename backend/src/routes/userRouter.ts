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
router.post("/registerNewEvent",async (req: Request, res: Response): Promise<void> => {
    const { userId, eventId } = req.body;

    try {
      // 1️⃣ Validate User
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // 2️⃣ Check if user has uploaded ID card
      if (!user.idCard) {
        res
          .status(400)
          .json({ message: "Please upload your ID card before registering." });
        return;
      }

      // 3️⃣ Validate Event
      const event = await Event.findById(eventId);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      // 4️⃣ Ensure arrays exist
      if (!Array.isArray(user.bookings)) user.bookings = [];
      if (!Array.isArray(event.attendees)) event.attendees = [];

      // 5️⃣ Check if user already registered
      const alreadyRegistered = await Booking.findOne({
        user: userId,
        event: eventId,
      });
      if (alreadyRegistered) {
        res.status(400).json({ message: "You are already registered for this event." });
        return;
      }

      // 6️⃣ Create new booking (no idCardUrl needed here)
      const newBooking = new Booking({
        user: userId,
        event: eventId,
        status: "pending",
      });
      await newBooking.save();

      // 7️⃣ Link booking to user
      user.bookings.push(newBooking._id as mongoose.Types.ObjectId);
      await user.save();

      // 8️⃣ Add user to event attendees
      if (!event.attendees.some((id: any) => id.toString() === userId)) {
        event.attendees.push(userId);
        await event.save();
      }

      // 9️⃣ Respond success
      res.status(200).json({
        message: "Registered successfully",
        bookingId: newBooking._id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering for event", error: err });
    }
  }
);



//createEvent
router.post("/createEvent",auth,upload.single("eventPic"),async(req:Request,res:Response) : Promise<void>=>{
    try{
       const { title, description, date, address, organizer } = req.body;

      if (!title || !description || !date || !address) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      let eventPic = "";
      if(req.file){
        const cloudUpload = await cloudinary.uploader.upload(req.file.path,{folder:"event-pics"});
        eventPic = cloudUpload.secure_url;
        fs.unlinkSync(req.file.path);
      }
        const newEvent = new Event({
            title,
            description,
            date,
            address,
            organizer,
            eventPic:eventPic||null
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
        .populate("event") 
        .lean();

      const registeredEvents = bookings.map((b) => b.event);

      res.status(200).json(registeredEvents);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching registered events", error: err });
    }
  }
);


// helper type so TS knows about multer files on req
type MulterFiles = {
  [fieldname: string]: Express.Multer.File[] | undefined;
};

router.post(
  "/updateProfile",
  upload.fields([{ name: "idCard" }, { name: "profilePic" }]),
  async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { userId, name, college } = req.body;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (name) user.username = name;
      if (college) user.college = college;

      const files = (req.files as unknown) as MulterFiles | undefined;

      // normalize cloudinary reference (supports cloudinary.v2 or cloudinary default export)
      const cloud = (cloudinary as any).v2 ?? (cloudinary as any);

      // Upload profile picture (optional)
      if (files?.profilePic && files.profilePic[0]) {
        const filePath = files.profilePic[0].path;
        const profileUpload = await cloud.uploader.upload(filePath, { folder: "profiles" });
        user.profilePic = profileUpload.secure_url;
        try { fs.unlinkSync(filePath); } catch { /* ignore */ }
      }

      // Upload ID card (optional)
      if (files?.idCard && files.idCard[0]) {
        const filePath = files.idCard[0].path;
        const idUpload = await cloud.uploader.upload(filePath, { folder: "id-cards" });
        user.idCard = idUpload.secure_url;
        try { fs.unlinkSync(filePath); } catch { /* ignore */ }
      }

      await user.save();

      return res.json({ success: true, user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating profile", error: err });
    }
  }
);
// ...existing code...

export default router;