'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'

export async function SendEmailVerifyUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null

  try {
    if (!email) {
      throw new Error('Preenchas os dados!')
    }

    const response = await ApiAction('/email/resendEmail', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message && message.includes('Failed to send email'))
      throw new Error('E-mail não cadastrado!')
    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
