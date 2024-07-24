import SearchComponent from '@/components/student/search/search'
interface SearchParamsProps {
  searchParams: {
    q: string
  }
}

export default function SortableTable({ searchParams }: SearchParamsProps) {
  const { q: queryQ } = searchParams
  let query = ''

  if (queryQ) query = queryQ
  else query = ''

  return (
    <div className="min-h-[20vw] p-4">
      <SearchComponent title={query} />
    </div>
  )
}
