import { Router } from 'express';
import {createRoutine, deleteRoutine, myRoutine, myWorkout, removeWorkout, saveWorkout} from '../controllers/myroutine/index'

const router = Router();

router.post('/createroutine', createRoutine);
router.post('/deleteroutine', deleteRoutine);
router.get('/', myRoutine);
router.get('/myworkout', myWorkout);
router.post('/removeworkout', removeWorkout);
router.post('/saveworkout', saveWorkout);

export default router;