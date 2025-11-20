
import {Request, Response } from 'express';
import User from '../../models/User'
import Booking from '../../models/Booking';

export const getEventRegisters = async(req:Request,res:Response):Promise<void>=>{
    const eventId = req.query.eventId as string;
    try{
        const bookings = await Booking.find({ event: eventId }).select('user').lean();
        const userIds = bookings.map(b => b.user);
        const users = (await User.find({ _id: { $in: userIds } },"email username -_id").lean());
        res.status(200).send({users:users});
    }catch(err:any){
         res.status(500).json({ message: 'Error fetching bookings', error: err.message || err });
    }
}