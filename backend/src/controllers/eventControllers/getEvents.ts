import Event from '../../models/Event';
import { Request,Response } from 'express';

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find();
    console.log(events);
    res.status(200).json({ events });
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching events', error: err.message || err });
  }
}