import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router;