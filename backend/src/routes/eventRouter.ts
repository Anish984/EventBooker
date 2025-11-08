import { Router, Request, Response } from 'express';
import Event from '../models/Event';
import Booking from '../models/Booking';
import auth from '../middlewares/auth';
import User from '../models/User';
const router = Router();

router.get('/events',auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching events', error: err.message || err });
  }
});

router.get("/getEventRegisters",auth,async(req:Request,res:Response):Promise<void>=>{
    const {eventId} = req.body;
    try{
        const bookings = await Booking.find({ event: eventId }).select('user').lean();
        const userIds = bookings.map(b => b.user);
        const users = (await User.find({ _id: { $in: userIds } },"email username -_id").lean());
        res.status(200).send({users:users});
    }catch(err:any){
         res.status(500).json({ message: 'Error fetching bookings', error: err.message || err });
    }
})

export default router;