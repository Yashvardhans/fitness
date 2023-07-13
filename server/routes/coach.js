import express from 'express';

import { addCoach , getCoaches , deleteTrainer , updateTrainer} from '../controllers/coach.js';

const router = express.Router();

router.post('/coach' , addCoach)

router.get('/getCoach' , getCoaches)

router.delete('/deleteCoach/:coachId', deleteTrainer);

router.patch('/coach/updateCoach/:id' ,updateTrainer)

export default router;