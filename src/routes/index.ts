import { Request, Response, Router } from 'express';
import { on_controller } from '@controllers';

const router = Router();

router.get('/on', on_controller);

export default router;