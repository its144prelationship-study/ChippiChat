import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const { protect } = require('../middlewares/auth.middleware');
const router = Router();

router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.post('/login', userController.login);
router.post('/logout', protect, userController.logout);
router.get('/me', protect, userController.getCurrentUser);
router.get('/validateUsername/:username',userController.validateUsername);
router.get('/', userController.getAllUsers);

export default router;