import {Request, Response} from 'express';
import User from '../../models/User';
import Event from '../../models/Event';
import Booking from '../../models/Booking';

import mongoose from 'mongoose';

export const registerNewEvent =async (req: Request, res: Response): Promise<void> => {
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
