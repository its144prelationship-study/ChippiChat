import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/validateUsername/:username',userController.validateUsername);

export default router;