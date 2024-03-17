import { prisma_instance } from "@configs";
import type { BaseError, FindsFlow, FirstAccessFlow } from "@types";

export const create_user_service: FirstAccessFlow['service'] = async ({ email, name, verifyHash }) => {
  try {
    const data = await prisma_instance.user.create({
      data: {
        email,
        name,
        ...(verifyHash ? { verifyHash } : {}),
      }
    });

    if (!data) throw new Error('Ocorreu um erro ao criar o usuário');

    return {
      message: 'Usuário criado com sucesso.',
      success: true,
      data
    }
  } catch (err: unknown) {
    const error = err as BaseError;

    return {
      message: error?.message ?? 'Não foi possível criar o usuário.',
      success: false,
    }
  }
};

export const find_users_service_by_email: FindsFlow['findUser'] = async email => {
  try {
    const data = await prisma_instance.user.findMany({
      where: {
        email,
      }
    });

    if (!data) throw new Error('Não foi possível encontrar o seus usuários.')

    return {
      message: 'Encontramos o seus usuários.',
      success: true,
      data
    }
  } catch (err: unknown) {
    const error = err as BaseError; 

    return {
      message: error?.message ?? 'Não foi possível recuperar a listagem de usuários por algum erro interno.',
      success: false,
    }
  }
}