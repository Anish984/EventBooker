// controllers/eventControllers/getPendingRequests.ts
import Booking from "../../models/Booking";
import { Request,Response } from "express";
export const getPendingRequests = async (req:Request, res:Response) => {
  try {
    const organizerId = req.userId; 
    const eventId = req.query.eventId;

    const bookings = await Booking.find({ 
      event: eventId, 
      status: "pending" 
    }).populate("user", "username email idCard -_id").lean();

    res.status(200).json({ requests: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching pending requests" });
  }
};
