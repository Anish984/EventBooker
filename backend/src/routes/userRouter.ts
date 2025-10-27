import {Router, Request, Response} from 'express';
import User from '../models/User';
import Event from '../models/Event';
import Booking from '../models/Booking';
import bcrypt from 'bcryptjs';
const router = Router();


router.post('/registerUser', async(req: Request, res: Response):Promise<void> => {    
    const {email, username} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message: "User already exists"});
            return;
        }
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email,
            username,
            password
        });
        await newUser.save();
        res.status(201).json({message: "User created successfully", userId: newUser._id});
    }    catch(err){
        res.status(500).json({message: "Error creating user", error: err});
    }
});

router.post("loginUser", async(req: Request, res: Response):Promise<void> => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({message: "Invalid credentials"});
            return;
        }
        res.status(200).json({message: "Login successful", userId: user._id});
    }catch(err){
        res.status(500).json({message: "Error logging in", error: err});
    }
});


router.post('/cancelEvent',async(req:Request,res:Response):Promise<void>=>{
    const {userId,EventId} = req.body;  
    try{
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }
        user.registeredEvents = user.registeredEvents?.filter(eventId => eventId.toString() !== EventId);
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

router.get("/getRegisteredEvents", async(req: Request, res: Response):Promise<void> => {
    const users = Event.find().then((events)=>{
        res.json(events);
    }).catch((err)=>{
        res.status(500).json({message: "Error fetching users", error: err});   
    })
});

export default router;
