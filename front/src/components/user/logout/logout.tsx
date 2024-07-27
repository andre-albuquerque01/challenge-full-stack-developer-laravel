'use client'
import { Logout } from '@/actions/user/logout'
import { FormEvent } from 'react'
import { IoLogOutOutline } from 'react-icons/io5'

export const LogoutComponente = () => {
  async function handleDelete(e: FormEvent) {
    e.preventDefault()
    await Logout()
  }

  return (
    <button
      onClick={handleDelete}
      className="px-8 font-semibold flex items-center gap-2 w-full transition duration-500 hover:underline"
    >
      <IoLogOutOutline size={18} />
      Sair
    </button>
  )
}
