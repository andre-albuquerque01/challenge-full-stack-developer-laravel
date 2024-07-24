'use server'

import apiError from '@/functions/error/apiErro'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Logout() {
  try {
    cookies().delete('token')
  } catch (error) {
    return apiError(error)
  }
  redirect('/')
}
