import {Router, Request, Response} from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const login =  async(req: Request, res: Response):Promise<void> => {
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
}