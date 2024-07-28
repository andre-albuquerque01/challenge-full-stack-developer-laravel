'use client'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { FormEvent, Suspense, useEffect, useState } from 'react'
import User from '@/actions/user/show'
import { UpdateUser } from '@/actions/user/update'
import { useRouter } from 'next/navigation'
import { InputUpdatePatterComponent } from '@/components/form/inputUpdatePatternComponent'
import { InputPatterComponent } from '@/components/form/inputPatternComponent'

interface UserInterface {
  name: string
  email: string
}
function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={pending}
        >
          Alterando...
        </button>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={pending}
        >
          Alterar
        </button>
      )}
    </>
  )
}

export const UpdateUserComponent = () => {
  const [error, setError] = useState<string | boolean>()
  const [data, setData] = useState<UserInterface>()
  const router = useRouter()
  useEffect(() => {
    const handleData = async () => {
      const dt = await User()
      setData(dt.user)
    }
    handleData()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await UpdateUser(data)
    if (req) {
      alert('Alterado com sucesso!')
      router.back()
    }
    setError(req)
  }

  return (
    <Suspense>
      <form
        className="space-y-5 flex flex-col p-4 text-black w-[90%] outline-none"
        onSubmit={handleSubmit}
      >
        <InputUpdatePatterComponent
          type="text"
          label="Nome completo"
          name="name"
          id="name"
          placeHolder="Informa o nome completo"
          required={true}
          value={data?.name ?? ''}
        />
        <InputUpdatePatterComponent
          type="email"
          label="E-mail"
          name="email"
          id="email"
          placeHolder="Informe o e-mail"
          required={true}
          value={data?.email ?? ''}
        />
        <InputPatterComponent
          type="password"
          label="Senha"
          name="password"
          id="Senha"
          placeHolder="Informe a senha atual"
          required={true}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <div className="w-full flex items-center justify-end outline-none">
          <div className="flex items-center justify-end gap-2 w-52 mb-4">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 bg-zinc-500 text-white rounded-md"
            >
              Cancelar
            </Link>
            <FormButton />
          </div>
        </div>
      </form>
    </Suspense>
  )
}
