import { Router, Request, Response } from 'express';
import Event from '../models/Event';
import Booking from '../models/Booking';
import auth from '../middlewares/auth';
import User from '../models/User';
import { searchEvents } from '../controllers/eventControllers/searchEvent';
import { getEventRegisters } from '../controllers/eventControllers/getEventRegisters';
import { getEvents } from '../controllers/eventControllers/getEvents';
const router = Router();

router.get('/events',auth, getEvents);

router.get("/getEventRegisters",auth,getEventRegisters)

router.get("/search",auth,searchEvents);

export default router;
