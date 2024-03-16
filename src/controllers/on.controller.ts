import { BaseController } from '@types'

export const on_controller: BaseController = async (req, res) => {
  return res.status(200).send({
    message: 'Está on.',
    success: true,
  })
};