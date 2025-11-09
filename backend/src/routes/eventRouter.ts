import { Router, Request, Response } from 'express';
import Event from '../models/Event';
import Booking from '../models/Booking';
import auth from '../middlewares/auth';
import User from '../models/User';
const router = Router();

router.get('/events', auth,async (req: Request, res: Response): Promise<void> => {
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

router.get("/search", auth,async (req, res) => {
  try {
    const search = (req.query.search as string)?.trim();

    if (!search) return res.json([]);

    // Step 1: Try fast text index search
    let results = await Event.find(
      { $text: { $search: search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // Step 2: Fallback to regex if no text matches
    if (results.length === 0) {
      const regex = new RegExp(search, "i");
      results = await Event.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { address: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
