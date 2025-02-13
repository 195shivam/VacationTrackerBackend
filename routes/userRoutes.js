import express from "express";
import { validateUser } from "../middleware/validateUser.js";

import {
    getUserDetails,
    helloAPI,
    loginUser,
    registerUser,
    updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get('/',helloAPI)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/update',validateUser, updateUser);
router.put('/update',validateUser, updateUser);
router.get('/details',validateUser,getUserDetails)


export default router;
