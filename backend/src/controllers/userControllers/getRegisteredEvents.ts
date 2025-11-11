import {Request, Response} from 'express';
import Booking from '../../models/Booking';


export const getRegisteredEvents = async (req: Request, res: Response): Promise<void> => {
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