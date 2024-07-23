'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function StudentOne(ra: string) {
  try {
    const response = await ApiAction(`/student/${ra}`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 30 * 60,
        tags: ['student'],
      },
    })
    const data = await response.json()

    if (data.message === 'Unauthenticated.' || !data) {
      cookies().delete('token')
      redirect('/')
    }

    return data.data
  } catch (error) {
    return apiError(error)
  }
}
