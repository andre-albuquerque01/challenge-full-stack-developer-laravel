'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'
import VerificationPassword from '@/functions/other/verifyPassword'
export interface UpdatePasswordRequestInterface {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export async function UpdatePasswordRecoverUser(
  request: UpdatePasswordRequestInterface,
) {
  try {
    if (!request.token || !request.password || !request.password_confirmation) {
      return 'Preencha os dados!'
    }
    if (request.password !== request.password_confirmation) {
      return 'Senhas incompatíveis!'
    }
    VerificationPassword(request.password)

    const response = await ApiAction('/resetPassword', {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    let text = ''
    switch (message) {
      case message.includes(
        'The password field must be at least 8 characters.',
      ):
        text = 'A senha deve ter ao menos 8 caracteres'
        break
      case message.includes(
        'The password field must contain at least one symbol.',
      ):
        text = 'A senha precisa de um caractere especial'
        break
      case message.includes(
        'The password field must contain at least one uppercase and one lowercase letter.',
      ):
        text = 'A senha precisa de ao menos uma letra maiúscula e uma minúscula'
        break
      case message.includes(
        'The given password has appeared in a data leak. Please choose a different password.',
      ):
        text = 'Senha fraca.'
        break
      default:
        return true
    }

    if (!response.ok) {
      return { ok: false, error: 'Houve erro, tente novamente', data: null }
    }

    return text
  } catch (error) {
    return apiError(error)
  }
}
