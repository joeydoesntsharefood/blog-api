import { ServiceResponse } from "./base.type";

export type BaseService<D, T> = (data: D) => Promise<ServiceResponse<T>>; 