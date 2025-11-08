import {Router, Request, Response} from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
const router = Router();
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
router.post('/signup', async(req: Request, res: Response):Promise<void> => {    
    const {email, username} = req.body;
    console.log(req.body);
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
        const token = jwt.sign({userId:newUser._id,email:email},process.env.JWT_SECRET || 'secret',{expiresIn:'1h'});
        res.status(201).json({message: "User created successfully", userId: newUser._id,token:token});
    }    catch(err){
        console.log(err);
        res.status(500).json({message: "Error creating user", error: err});
    }
});

router.post("/login", async(req: Request, res: Response):Promise<void> => {
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
        console.log(user._id);
         const token = jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET || 'secret',{expiresIn:'1h'});
        res.status(200).json({message: "Login successful", userId: user._id,token:token});
    }catch(err){
        res.status(500).json({message: "Error logging in", error: err});
    }
});
export default router