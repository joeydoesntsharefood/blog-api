import { create_user_schema, update_password_schema } from "@schemas";
import { compare_hash, create_user_service, find_user_service_by_id, find_users_service_by_email, gen_random_rounds, generate_hash, update_user_service_by_id } from "@services";
import type { BaseError, FirstAccessFlow, UpdatePasswordFlow } from "@types";
import { debug_util, error_util } from "@utils";

export const first_access: FirstAccessFlow['controler'] = async (req, res) => {
  const { consoleDebug } = debug_util(true);
  const { format } = error_util();

  try {
    const { email, name } = create_user_schema.parse(req.body);
    
    const { data: userList, success: findEmail } = await find_users_service_by_email(email) 

    if (findEmail && userList?.length !== 0) throw new Error('O e-mail já está em uso.');
    
    const randomRounds = gen_random_rounds();

    consoleDebug(`{ code: ${randomRounds} }`);

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
      message: format(error?.message, 'Ocorreu um erro na solicitação.'),
      success: false,
    })
  }
};

export const update_password: UpdatePasswordFlow['controler'] = async (req, res) => {
  const { format } = error_util();
  const { consoleDebug } = debug_util(true);

  try {
    const {
      code,
      confirmPassword,
      id,
      password
    } = update_password_schema.parse(req.body);

    const {
      message: findMessage,
      success: findSuccess,
      data,
    } = await find_user_service_by_id(id);

    if (!findSuccess) throw new Error(findMessage);

    const STATIC_HASH = process.env.STATIC_HASH || 'dsajdlka';

    const { data: verifyHash } = await generate_hash({ value: STATIC_HASH, salt: code });
    
    consoleDebug(`data.verifyHash: ${data?.verifyHash && data.verifyHash} - verifyHash: ${verifyHash}`);

    const { data: compare } = await compare_hash({ compareHash: data?.verifyHash, verifyHash });

    if (compare) throw new Error('O codigo invalido');

    if (password !== confirmPassword) throw new Error('Senhas diferentes.');

    const { data: passwordHash } = await generate_hash({ value: password, salt: Number(process.env.SALT_ROUNDS) || 20 })
    
    const { message, success, data: updateData } = await update_user_service_by_id({
      id,
      updateData: {
        verifyHash: '',
        hasVerified: true,
        passwordHash,
      }
    });

    if (!success) throw new Error(message);

    return res.status(200).send({
      message,
      success,
      data: updateData,
    })
  } catch (err: unknown) {
    const error = err as BaseError;

    return res.status(500).send({
      message: format(error?.message, 'Ocorreu um erro na solicitação.'),
      success: false,
    })
  }
};