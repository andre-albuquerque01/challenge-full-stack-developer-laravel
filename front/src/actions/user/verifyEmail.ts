'use server'

import ApiAction from '@/functions/data/apiAction'

export interface UserInterface {
  name: string
  email: string
}

export default async function VerifyEmail(id: string, hash: string) {
  try {
    const response = await ApiAction(`/email/verify/${id}/${hash}`, {
      headers: {
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message.includes('success')) return 'Verificado com sucesso'
    return 'Houver erro na verificação'
  } catch (error) {
    return 'Houver erro na verificação'
  }
}
