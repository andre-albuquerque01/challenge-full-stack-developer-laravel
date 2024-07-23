'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import { cookies } from 'next/headers'

export async function UpdateStudent(reqBody: object, ra: string) {
  try {
    const response = await ApiAction(`/student/${ra}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()
    if (!response.ok) return data

    RevalidateTag('student')
    return true
  } catch (error) {
    return 'Houver error'
  }
}
