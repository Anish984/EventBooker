import {Request, Response} from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

const signUp = async(req: Request, res: Response):Promise<void> => {    
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
}
export default signUp