import { Router } from 'express';
import {filter, search, routine} from '../controllers/main/index'

const router = Router();

router.post('/filter', filter);
router.post('/search', search);
router.get('/routine', routine);

export default router;