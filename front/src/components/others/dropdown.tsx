'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { LogoutComponente } from '../user/logout/logout'
import { BsPencilSquare } from 'react-icons/bs'

export const Dropdown = () => {
  const [navUser, setNavUser] = useState<boolean>(false)

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-8 transition duration-500 bg-zinc-100 border border-zinc-300 cursor-pointer">
        <p
          className="px-2 font-semibold flex justify-between items-center w-full h-8 hover:underline"
          onClick={() => setNavUser((e) => !e)}
        >
          Usuário <IoIosArrowDown size={18} />
        </p>
        {navUser && (
          <>
            <Link
              href="/user/update"
              className="px-8 py-2 font-semibold w-full flex items-center gap-2 transition duration-500 hover:underline"
              onClick={() => setNavUser((e) => !e)}
            >
              <BsPencilSquare size={18} />
              Editar
            </Link>
            <LogoutComponente />
          </>
        )}
      </div>
    </div>
  )
}
