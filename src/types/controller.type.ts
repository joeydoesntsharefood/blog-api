import { Request, Response } from 'express';
import { BaseResponse } from './base.type';

export type BaseController <T = null> = (req: Request, res: Response) => Promise<Response<BaseResponse<T>>>;