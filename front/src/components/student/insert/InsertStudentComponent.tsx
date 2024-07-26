'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { InsertStudent } from '@/actions/student/insertStudent'
import InputMask from 'react-input-mask-next'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { InputPatterComponent } from '@/components/form/inputPatternComponent'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={pending}
        >
          Cadastrando...
        </button>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={pending}
        >
          Cadastrar
        </button>
      )}
    </>
  )
}

export const InsertStudentComponent = () => {
  const [state, action] = useFormState(InsertStudent, {
    ok: false,
    error: '',
    data: null,
  })
  const router = useRouter()

  useEffect(() => {
    if (state.ok) {
      alert('Cadastrado com sucesso!')
      router.back()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, state.ok])

  return (
    <form
      className="space-y-5 flex flex-col p-4 text-black w-[90%] outline-none"
      action={action}
    >
      <InputPatterComponent
        type="text"
        label="Nome"
        name="name"
        id="name"
        placeHolder="Informe o nome completo"
        required={true}
      />
      <InputPatterComponent
        type="email"
        label="E-mail"
        name="email"
        id="email"
        placeHolder="E-mail"
        required={true}
      />
      <InputPatterComponent
        type="text"
        label="RA"
        name="ra"
        id="ra"
        placeHolder="Informe o registro acadêmico"
        required={true}
      />
      <div className="flex items-center h-10 border border-zinc-300 rounded-r-md">
        <label
          htmlFor="cpf"
          className="border h-full w-[20%] flex items-center bg-zinc-200 px-4 font-semibold"
        >
          CPF
        </label>
        <InputMask
          mask="999.999.999-99"
          type="text"
          name="cpf"
          id="cpf"
          placeholder="Informe o número do documento"
          className="flex-1 p-4 bg-transparent text-sm h-10 outline-none placeholder:text-zinc-500 focus-within:outline-none"
          required
        />
      </div>
      {state.error && <p className="text-xs text-red-600">{state.error}</p>}
      <div className="w-full outline-none flex items-center justify-end">
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
  )
}
