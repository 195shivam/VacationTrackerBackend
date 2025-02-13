import express from "express";
import { validateUser } from "../middleware/validateUser.js";

import {
addLeave,
getAllLeaves
} from "../controllers/leaveController.js";

const router = express.Router();

router.post('/addLeave',validateUser, addLeave);
router.get('/getLeaves', getAllLeaves);

export default router;
