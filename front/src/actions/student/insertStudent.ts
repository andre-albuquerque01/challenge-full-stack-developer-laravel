'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import apiError from '@/functions/error/apiErro'
import { cookies } from 'next/headers'

export async function InsertStudent(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const name = request.get('name') as string | null
  const email = request.get('email') as string | null
  const cpf = request.get('cpf') as string | null
  const ra = request.get('ra') as string | null
  try {
    if (!name || !email || !cpf || !ra) {
      throw new Error('Preenchas os dados!')
    }

    const response = await ApiAction('/student', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 30 * 60,
        tags: ['student'],
      },
      body: request,
    })

    const data = await response.json()

    if (data.message === 'The ra has already been taken.')
      throw new Error('O registro acadêmico já está em uso!')
    if (data.message === 'The name field must be at least 4 characters.')
      throw new Error('O campo deverá ter mais de 4 caracteres.')

    RevalidateTag('student')
    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
