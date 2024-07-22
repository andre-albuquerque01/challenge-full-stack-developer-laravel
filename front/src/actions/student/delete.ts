'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import apiError from '@/functions/error/apiErro'
import { cookies } from 'next/headers'

export async function DeleteStudent(ra: number) {
  try {
    const response = await ApiAction(`/student/${ra}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })
    RevalidateTag('student')
    if (!response.ok) {
      return false
    }
    return true
  } catch (error) {
    return apiError(error)
  }
}
