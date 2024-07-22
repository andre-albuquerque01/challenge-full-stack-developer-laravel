'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Logout() {
  try {
    const response = await ApiAction('/logout', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })

    const data = await response.json()

    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message && message.includes('Unauthenticated.')) return 'Não autorizado'

    cookies().delete('token')
  } catch (error) {
    return apiError(error)
  }
  redirect('/')
}
