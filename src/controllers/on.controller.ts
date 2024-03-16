import { OnFlow } from '@types'

export const on_controller: OnFlow['controler'] = async (_, res) => {
  return res.status(200).send({
    message: 'Está on.',
    success: true,
  })
};