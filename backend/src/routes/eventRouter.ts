import { Router, Request, Response } from 'express';
import Event from '../models/Event';
import Booking from '../models/Booking';
import auth from '../middlewares/auth';
import User from '../models/User';
import { searchEvents } from '../controllers/eventControllers/searchEvent';
import { getEventRegisters } from '../controllers/eventControllers/getEventRegisters';
import { handleRequest } from '../controllers/eventControllers/handleRequest';
import { getPendingRequests } from '../controllers/eventControllers/getPending';
import { getEvents } from '../controllers/eventControllers/getEvents';
const router = Router();

router.get('/events',auth, getEvents);

router.get("/getEventRegisters",auth,getEventRegisters)

router.get("/search",auth,searchEvents);

router.get("/pendingRequests", auth, getPendingRequests);

router.post("/handleRequest", auth, handleRequest);

export default router;
