import type { User } from "@prisma/client";
import type { BaseFlow } from "./base.type";
import type { BaseController } from "./controller.type";
import type { BaseService } from "./service.type";

export type OnFlow = BaseFlow<BaseController, null>;
export type FirstAccessFlow = BaseFlow<BaseController, BaseService<{ name: string, email: string, verifyHash: string }, User>>;
export type UpdatePasswordFlow = BaseFlow<BaseController, BaseService<{ id: string, passwordHash: string }, User>>;

export interface FindsFlow {
  findUserByEmail: BaseService<string, User[]>;
  findUserById: BaseService<string, User>;
};

export interface PatchsFlow {
  update_user_service_by_id: BaseService<{ id: string, updateData: Partial<User> }, User>;
}

export interface CryptFlow {
  generate: BaseService<{ value: string, salt: number }, string>;
  compare: BaseService<{ verifyHash?: string, compareHash?: string | null }, boolean>;
  genRandomRounds(): number;
}