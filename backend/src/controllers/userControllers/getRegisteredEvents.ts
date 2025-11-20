import {Request, Response} from 'express';
import Booking from '../../models/Booking';


export const getRegisteredEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId;
      console.log("CONTROLLER DEBUG 1: Value received from request:", userId); // Log the received value
    console.log("CONTROLLER DEBUG 2: Type of received value:", typeof userId); // Log the type

    // The query that causes the error:
    const bookings = await Booking.find({ user: userId })
      .populate("event") 
      .lean();


      const registeredEvents = bookings.map((b) => b.event);

      res.status(200).json(registeredEvents);
    } catch (err) {
      res.status(500).json({ message: "Error fetching registered events"});
    }
  }