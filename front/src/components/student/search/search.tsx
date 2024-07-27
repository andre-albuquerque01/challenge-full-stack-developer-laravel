'use client'
import StudentSearch from '@/actions/student/search'
import { DeleteComponent } from '@/components/student/others/delete'
import Link from 'next/link'
import React, { useState, useMemo, useEffect, Suspense } from 'react'

export type StudentType = {
  ra: number
  name: string
  email: string
  cpf: string
}

type SortConfig = {
  key: keyof StudentType
  direction: 'ascending' | 'descending'
}

export default function SearchComponent({ title }: { title: string }) {
  const [data, setData] = useState<StudentType[]>([])

  useEffect(() => {
    if (title === '') {
      setData([])
      return
    }
    const handleData = async () => {
      const response = await StudentSearch(title)
      setData(response)
    }
    handleData()
  }, [title])

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'ra',
    direction: 'ascending',
  })

  const sortedData = useMemo(() => {
    const sortableItems = [...data]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [data, sortConfig])

  const requestSort = (key: keyof StudentType) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getClassNamesFor = (name: keyof StudentType) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  return (
    <Suspense>
      <div className="overflow-x-auto">
        <table className="min-w-full text-center bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('ra')}
              >
                {getClassNamesFor('ra') === 'ascending' ? '▲' : '▼'}
                Registro Acadêmico{' '}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('name')}
              >
                {getClassNamesFor('name') === 'ascending' ? '▲' : '▼'}
                Nome
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('cpf')}
              >
                {getClassNamesFor('cpf') === 'ascending' ? '▲' : '▼'}
                CPF
              </th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((person) => (
              <tr key={person.ra}>
                <td className="py-2 px-4 border-b">{person.ra}</td>
                <td className="py-2 px-4 border-b">{person.name}</td>
                <td className="py-2 px-4 border-b">{person.cpf}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={`/student/update/${person.ra}`}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </Link>{' '}
                  | <DeleteComponent ra={person.ra} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  )
}
