import { Router } from 'express';
import {github, google, kakao, signin, signout, signup, token, update,resign} from '../controllers/users/index'

const router = Router();

router.post('/resign', resign);
router.post('/update', update);
router.get('/signout', signout);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/token', token);
router.post('/kakao', kakao);
router.post('/google', google);
router.post('/github', github);

export default router;