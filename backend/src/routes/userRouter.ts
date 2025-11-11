import {Router, Request, Response} from 'express';
import auth from '../middlewares/auth'
import upload from "../middlewares/multerStorage";
import { cancelEvent } from '../controllers/userControllers/cancelEvent';
import {registerNewEvent} from '../controllers/userControllers/registerNewEvent';
import { createEvent } from '../controllers/userControllers/createEvent';
import { getRegisteredEvents } from '../controllers/userControllers/getRegisteredEvents';
import { updateProfile } from '../controllers/userControllers/uploadProfile';
const router = Router();


//newEvent
router.post("/cancelEvent", auth,cancelEvent);

//registerNewEvent
router.post("/registerNewEvent",auth,registerNewEvent);

//createEvent
router.post("/createEvent",auth,upload.single("eventPic"),createEvent);

//get the registered events of the user
router.get("/getRegisteredEvents",auth,getRegisteredEvents);


router.post("/updateProfile",auth,upload.fields([{ name: "idCard" }, { name: "profilePic" }]),updateProfile);



export default router;