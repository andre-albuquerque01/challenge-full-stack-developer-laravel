'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'

export async function SendEmailUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null

  try {
    if (!email) {
      throw new Error('Preenchas os dados!')
    }

    const response = await ApiAction('/email/recoverPasswordSendEmail', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (message && message.includes('Failed to send email'))
      throw new Error('E-mail não cadastrado!')
    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
