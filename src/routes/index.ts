import { Router } from 'express';
import { first_access, on_controller, update_password } from '@controllers';

const router = Router();

router.get('/on', on_controller);
router.post('/signin', first_access);
router.patch('/user', update_password);

export default router;