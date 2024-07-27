'use client'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { FormEvent, Suspense, useEffect, useState } from 'react'
import { UpdateStudent } from '@/actions/student/update'
import StudentOne from '@/actions/student/show'
import { StudentType } from '../others/SortableTable'
import { useRouter } from 'next/navigation'
import { InputUpdatePatterComponent } from '@/components/form/inputUpdatePatternComponent'

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

export const UpdateStudentComponent = ({ ra }: { ra: string }) => {
  const [error, setError] = useState()
  const [data, setData] = useState<StudentType>()
  const router = useRouter()
  useEffect(() => {
    const handleData = async () => {
      const dt = await StudentOne(ra)
      setData(dt)
    }
    handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await UpdateStudent(data, ra)
    if (req) {
      alert('Alterado com sucesso!')
      router.back()
    }
    setError(req.message)
  }

  return (
    <Suspense>
      <form
        className="space-y-5 flex flex-col p-4 text-black w-[90%] outline-none"
        onSubmit={handleSubmit}
      >
        <InputUpdatePatterComponent
          type="text"
          label="Nome"
          name="name"
          id="name"
          value={data?.name ?? ''}
          placeHolder="Informe o nome completo"
          required={true}
        />
        <InputUpdatePatterComponent
          type="email"
          label="E-mail"
          name="email"
          id="email"
          value={data?.email ?? ''}
          placeHolder="E-mail"
          required={true}
        />

        <div className="flex items-center h-10 border border-zinc-300 rounded-r-md">
          <label className="border h-full w-[20%] flex items-center bg-zinc-200 px-4 font-semibold">
            RA
          </label>
          <input
            disabled
            placeholder="Informe o registro acadêmico"
            className="flex-1 p-4 bg-transparent text-sm h-10 outline-none bg-zinc-100  placeholder:text-zinc-500 focus-within:outline-none"
            defaultValue={data?.ra}
            required
          />
        </div>
        <div className="flex items-center h-10 border border-zinc-300 rounded-r-md">
          <label className="border h-full w-[20%] flex items-center bg-zinc-200 px-4 font-semibold">
            CPF
          </label>
          <input
            type="text"
            disabled
            placeholder="Informe o número do documento"
            className="flex-1 p-4 bg-transparent text-sm h-10 outline-none bg-zinc-100  placeholder:text-zinc-500 focus-within:outline-none"
            defaultValue={data?.cpf}
            required
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <div className="outline-none flex items-center justify-end">
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
