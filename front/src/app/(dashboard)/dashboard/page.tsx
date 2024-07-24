import SearchForm from '@/components/form/searchQuery'
import { SortableTable } from '@/components/student/others/SortableTable'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-[40vw] p-4">
      <div className="flex items-center justify-between">
        <SearchForm />
        <Link
          href="/student/insert"
          className="flex justify-center items-center text-lg rounded-md bg-zinc-500 text-white font-semibold w-60 px-4 py-1 h-10 border border-zinc-500"
        >
          Cadastrar Aluno
        </Link>
      </div>
      <SortableTable />
    </div>
  )
}
