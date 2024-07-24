'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import { cookies } from 'next/headers'

export async function UpdateUser(reqBody: object) {
  try {
    const response = await ApiAction('/user', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()

    if (data.data.message === 'The email has already been taken.')
      return 'E-mail já cadastrado!'

    if (!response.ok) return 'Senha incorreta.'
    RevalidateTag('user')
    return true
  } catch (error) {
    return 'Houver error'
  }
}
