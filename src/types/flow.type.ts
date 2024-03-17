import type { User } from "@prisma/client";
import type { BaseFlow } from "./base.type";
import type { BaseController } from "./controller.type";
import type { BaseService } from "./service.type";

export type OnFlow = BaseFlow<BaseController, null>;
export type FirstAccessFlow = BaseFlow<BaseController, BaseService<{ name: string, email: string, verifyHash: string }, User>>;

export interface FindsFlow {
  findUser: BaseService<string, User[]>;
};

export interface CryptFlow {
  generate: BaseService<{ value: string, salt: number }, string>;
  compare: BaseService<{ verifyHash: string, compareHash: string, salt: string }, boolean>;
  genRandomRounds(): number;
}