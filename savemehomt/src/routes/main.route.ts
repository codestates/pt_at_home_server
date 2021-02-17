import { Router } from 'express';
import {main, filter, search, routine} from '../controllers/main/index'

const router = Router();

router.get('/', main);
router.post('/filter', filter);
router.post('/search', search);
router.get('/routine', routine);

export default router;