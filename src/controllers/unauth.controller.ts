import { create_user_schema } from "@schemas";
import { create_user_service, find_users_service_by_email, gen_random_rounds, generate_hash } from "@services";
import type { BaseError, FirstAccessFlow } from "@types";

export const first_access: FirstAccessFlow['controler'] = async (req, res) => {
  try {
    const { email, name } = create_user_schema.parse(req.body);
    
    const { data: userList, success: findEmail } = await find_users_service_by_email(email) 

    if (findEmail && userList?.length !== 0) throw new Error('O e-mail já está em uso.');
    
    const randomRounds = gen_random_rounds();

    const STATIC_HASH = process.env.STATIC_HASH || 'dsajdlka';

    const { data: verifyHash } = await generate_hash({ salt: randomRounds, value: STATIC_HASH });

    const { message, success, data } = await create_user_service({ email, name, verifyHash: verifyHash ?? 'abacates' });

    if (!success) throw new Error(message);

    return res.status(200).send({
      message,
      success,
      data,
    })
  } catch (err: unknown) {
    const error = err as BaseError;

    return res.status(500).send({
      message: error?.message ?? 'Ocorreu um erro na solicitação.',
      success: false,
    })
  }
}