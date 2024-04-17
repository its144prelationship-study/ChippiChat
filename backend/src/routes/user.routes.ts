import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const { protect } = require('../middlewares/auth.middleware');
const router = Router();

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.post('/logout', protect, userController.logout);
router.get('/me', protect, userController.getCurrentUser);

export default router;