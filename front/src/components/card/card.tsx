import Link from 'next/link'
import { Title } from './title'
import { Dropdown } from '../others/dropdown'

export const Card = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex w-full min-h-[80%]">
      <div className="w-[20%] min-h-full border border-zinc-800">
        <div className="flex items-center justify-center h-10 bg-zinc-500">
          <h1 className="font-semibold text-white">Módulo Acadèmico</h1>
        </div>
        <Dropdown />
        <Link
          href="/dashboard"
          className="flex items-center justify-start h-8 bg-zinc-100 border border-zinc-300 cursor-pointer"
        >
          <p className="px-2 font-semibold hover:underline">Alunos</p>
        </Link>
      </div>
      <div className="w-[80%] border border-zinc-800">
        <div className="flex items-center justify-center h-8 bg-zinc-100 border-b border-zinc-700">
          <p className="px-2 font-semibold">
            <Title />
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
