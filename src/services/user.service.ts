import { prisma_instance } from "@configs";
import type { BaseError, FindsFlow, FirstAccessFlow, PatchsFlow } from "@types";

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

export const find_users_service_by_email: FindsFlow['findUserByEmail'] = async email => {
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
};

export const find_user_service_by_id: FindsFlow['findUserById'] = async id => {
  try {
    const data = await prisma_instance.user.findUnique({
      where: {
        id
      }
    })

    if (!data) throw new Error('Não foi possível encontrar o usuário.');

    return {
      message: 'Encontramos o usuário selecionado.',
      success: true,
      data,
    };
  } catch (err: unknown) {
    const error = err as BaseError;

    return {
      message: error?.message ?? 'Nao foi possivel terminar a solicitacao.',
      success: false,
    }
  }
};

export const update_user_service_by_id: PatchsFlow['update_user_service_by_id'] = async ({ id, updateData }) => {
  try {
    const data = await prisma_instance.user.update({
      where: {
        id,
      },
      data: updateData,
    });

    if (!data) throw new Error('Ocorreu um erro ao atualizar o usuario.');

    return {
      message: 'Atualizamos com sucesso o seu usuario.',
      success: true,
      data,
    };
  } catch (err: unknown) {
    const error = err as BaseError;

    return {
      message: error?.message ?? 'Nao foi possivel atualizar o usuario.',
      success: false
    }
  }
}