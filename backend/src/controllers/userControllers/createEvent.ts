import {Router, Request, Response} from 'express';
import Event from '../../models/Event';

import cloudinary from "../../utils/cloudinary";
import fs from "fs";


export const createEvent = async(req:Request,res:Response) : Promise<void>=>{
    try{
       const { title, description, date, address, organizer } = req.body;

      if (!title || !description || !date || !address) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      let eventPic = "";
      if(req.file){
        const cloudUpload = await cloudinary.uploader.upload(req.file.path,{folder:"event-pics"});
        eventPic = cloudUpload.secure_url;
        fs.unlinkSync(req.file.path);
      }
        const newEvent = new Event({
            title,
            description,
            date,
            address,
            organizer,
            eventPic:eventPic||null
        });
        await newEvent.save();
        res.status(200).send({message:"successfully created",event:newEvent});
    }catch(err){
        res.status(500).json({message: "Error creating event", error: err});
    }
}