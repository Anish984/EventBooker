import {Router, Request, Response} from 'express';
import User from '../models/User';
import Event from '../models/Event';
import Booking from '../models/Booking';
import auth from '../middlewares/auth'
const router = Router();
router.post('/cancelEvent',auth,async(req:Request,res:Response):Promise<void>=>{
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
router.post('/registerNewEvent',auth,async(req:Request,res:Response):Promise<void>=>{
    const {userId,EventId} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }
        const event = await Event.findById(EventId);
        if(!event){
            res.status(404).send({message:"event not found"});
            return;
        }
         if (!Array.isArray(user.registeredEvents)) user.registeredEvents = [];
        if (!Array.isArray(event.attendees)) event.attendees = [];
        if (!user.registeredEvents.some((id: any) => id.toString() === EventId)) {
            user.registeredEvents.push(EventId);
            await user.save();
        }
        await user.save();
        try{
            const newBooking = new Booking({
                user: userId,
                event: EventId
            });
            await newBooking.save();
            if (!event.attendees.some((id: any) => id.toString() === userId)) {
                event.attendees.push(userId);
                await event.save();
            }
        }catch(err){
            res.status(500).json({message: "Error creating booking", error: err});
            return;
        }
        res.status(200).json({message: "Registered successfully"});
    }catch(err){
        res.status(500).json({message: "Error registering for event", error: err});
    }
});
router.post("/createEvent",auth,async(req:Request,res:Response) : Promise<void>=>{
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
        await newEvent.save();
        // if(!newEvent){
        //     res.status(500).json({message: "Error creating event"})
        // }
        res.status(200).send({message:"successfully created",event:newEvent});
    }catch(err){
        res.status(500).json({message: "Error creating event", error: err});
    }
});
router.get("/getRegisteredEvents", auth,async(req: Request, res: Response):Promise<void> => {
    const users = Event.find().select('-attendees').lean().then((events)=>{
        res.json(events);
    }).catch((err)=>{
        res.status(500).json({message: "Error fetching users", error: err});   
    })
});

export default router;
