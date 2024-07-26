'use client'
import { usePathname } from 'next/navigation'

export const Title = () => {
  const params = usePathname()

  let title = 'Consulta de alunos'
  if (params.startsWith('/student/insert')) {
    title = 'Cadastro de alunos'
  } else if (params.startsWith('/student/update')) {
    title = 'Alterar aluno'
  } else if (params.startsWith('/user/update')) {
    title = 'Alterar usuário'
  }
  return title
}
