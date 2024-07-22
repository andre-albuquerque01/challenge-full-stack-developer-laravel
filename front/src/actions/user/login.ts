'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Login(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null

  const cookiesStore = cookies()

  try {
    if (!email || !password) throw new Error('Preenchas os dados!')

    const response = await ApiAction('/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message.includes('Email and password invalid.')) {
      throw new Error('E-mail ou senha inválida!')
    }

    if (message.includes('E-mail não verificado')) {
      throw new Error('E-mail não verificado')
    }

    if (message.includes('Email or password incorrect')) {
      throw new Error('E-mail ou senha inválida!')
    }

    if (message.includes('Email not registered')) {
      throw new Error('E-mail não registrado!')
    }
    if (message.includes('The password field must be at least 8 characters.')) {
      throw new Error('E-mail ou senha inválida!')
    }
    if (message.includes('Unexpected end of JSON input')) {
      throw new Error('Usuário ou senha inválido!')
    }

    if (!response.ok) throw new Error('Usuário ou senha inválido!')

    cookiesStore.set('token', data.data.token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })
  } catch (error) {
    return apiError(error)
  }
  redirect('/dashboard')
}
