import express from "express";

import { addClass  , getClass, bookClass ,getBookings , deleteClass , updateClass} from "../controllers/class.js";


const router = express.Router();

router.post('/class' , addClass);
router.get('/class/getClass' , getClass)

router.post('/class/:id/book' , bookClass);
router.get('/user/:userId', getBookings);

router.patch('/class/updateClass/:id', updateClass);

router.delete('/class/deleteClass/:classId', deleteClass);

export default router;