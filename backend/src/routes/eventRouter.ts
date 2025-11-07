import { Router, Request, Response } from 'express';
import Event from '../models/Event';
const router = Router();

router.get('/events', async(req: Request, res: Response):Promise<void> => {
    const users = Event.find().then((events)=>{
        res.json(events);
    }).catch((err)=>{
        res.status(500).json({message: "Error fetching users", error: err});   
    })
});

export default router;