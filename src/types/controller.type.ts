import type { Request, Response } from 'express';
import type { BaseResponse } from './base.type';

export type BaseController <T = null> = (req: Request, res: Response) => Promise<Response<BaseResponse<T>>>;