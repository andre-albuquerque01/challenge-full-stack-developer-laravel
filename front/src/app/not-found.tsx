import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen mt-[-80px]">
      <h1 className="text-black text-2xl text-center">
        Olá! Infelizmente não encontramos esta rota.
      </h1>
      <Link href="/dashboard" className="underline text-blue-600">
        Voltar para o inicio
      </Link>
    </div>
  )
}
