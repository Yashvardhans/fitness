import express from "express";

import { getUserData , updateUser } from "../controllers/user.js";
import { login , signup } from "../controllers/auth.js";
import auth from '../middleware/auth.js';

const router = express.Router() ;

router.post('/signup', signup)

router.post('/login', login)

router.get('/profile', auth ,  getUserData)

router.patch('/profile/:id' , updateUser);

export default router