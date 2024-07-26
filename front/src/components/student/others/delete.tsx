'use client'
import { DeleteStudent } from '@/actions/student/delete'
import { FormEvent } from 'react'

export const DeleteComponent = ({ ra }: { ra: number }) => {
  async function handleDelete(e: FormEvent) {
    e.preventDefault()
    if (confirm('Deseja excluir?')) {
      const response = await DeleteStudent(ra)
      if (response) alert('Foi excluída com sucesso!')
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      Excluir
    </button>
  )
}
