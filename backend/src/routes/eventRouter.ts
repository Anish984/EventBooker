import { Router, Request, Response } from 'express';

import User from '../models/User';
import Event from '../models/Event';
import Booking from '../models/Booking';
const router = Router();

router.get('/events', async(req: Request, res: Response):Promise<void> => {
    const users = Event.find().then((events)=>{
        res.json(events);
    }).catch((err)=>{
        res.status(500).json({message: "Error fetching users", error: err});   
    })
});

router.post("/createEvent",async(req:Request,res:Response) : Promise<void>=>{
    try{
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const address = req.body.address;
        const organizer = req.body.organizer;
        
        const newEvent = new Event({
            title,
            description,
            date,
            address,
            organizer,
        });
    }catch(err){
        res.status(500).json({message: "Error creating event", error: err});
    }
});

export default router;