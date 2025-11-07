import {Router, Request, Response} from 'express';
import User from '../models/User';
import Event from '../models/Event';
import Booking from '../models/Booking';


const router = Router();
router.post('/cancelEvent',async(req:Request,res:Response):Promise<void>=>{
    const {userId,EventId} = req.body;  
    try{
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }
        if(user.registeredEvents===undefined || !user.registeredEvents.includes(EventId)){
            res.status(400).json({message: "User is not registered for this event"});
            return;
        }
        user.registeredEvents = user.registeredEvents.filter((eventId) => {
            return eventId.toString() !== EventId;
        });
        await user.save();
        res.status(200).json({message: "Registration cancelled successfully"});
    }catch(err){
        res.status(500).json({message: "Error cancelling registration", error: err});
    }

});
router.post('/registerNewEvent',async(req:Request,res:Response):Promise<void>=>{
    const {userId,EventId} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }
        user.registeredEvents?.push(EventId);
        await user.save();
        try{
            const newBooking = new Booking({
                user: userId,
                event: EventId
            });
            await newBooking.save();    
        }catch(err){
            res.status(500).json({message: "Error creating booking", error: err});
            return;
        }
        res.status(200).json({message: "Registered successfully"});
    }catch(err){
        res.status(500).json({message: "Error registering for event", error: err});
    }
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
router.get("/getRegisteredEvents", async(req: Request, res: Response):Promise<void> => {
    const users = Event.find().then((events)=>{
        res.json(events);
    }).catch((err)=>{
        res.status(500).json({message: "Error fetching users", error: err});   
    })
});

export default router;
