// controllers/eventControllers/handleRequest.ts
import Booking from "../../models/Booking";
import { Request,Response } from "express";
export const handleRequest = async (req:Request, res:Response) => {
  try {
    const { bookingId, action } = req.body; 
    // action = "approve" | "reject"
    
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = action === "approve" ? "approved" : "rejected";
    await booking.save();

    res.status(200).json({ message: `Booking ${action}d successfully` ,booking:booking});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating booking status" });
  }
};
