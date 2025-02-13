import express from "express";
import { validateUser } from "../middleware/validateUser.js";

import {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.post('/create',validateUser, createEvent);
router.get('/fetch', getEvents);
router.delete("/remove/:eventId", deleteEvent);
router.put("/update/:eventId",validateUser, updateEvent);

export default router;
