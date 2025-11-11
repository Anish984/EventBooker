import {Request, Response} from 'express';
import User from '../../models/User';
import Event from '../../models/Event';
import Booking from '../../models/Booking';



export const cancelEvent = async (req: Request, res: Response): Promise<void> => {
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
    }
