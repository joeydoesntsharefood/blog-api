import { Router } from 'express';
import { first_access, on_controller } from '@controllers';

const router = Router();

router.get('/on', on_controller);
router.post('/signin', first_access);

export default router;