'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) return null

    router.push(`/student/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex my-2 w-[70%] items-center h-10 border border-zinc-300 rounded-lg"
    >
      <input
        name="q"
        type="search"
        placeholder="Digita sua busca"
        className="flex-1 p-4 bg-transparent h-10 rounded-l-lg text-sm outline-none placeholder:text-zinc-500"
        defaultValue={query ?? ''}
        required
      />
      <button className="bg-zinc-300 font-semibold h-full px-5 rounded-r-md">
        Pesquisar
      </button>
    </form>
  )
}
