'use client'
import { useRouter } from 'next/navigation'
import { GoArrowLeft } from 'react-icons/go'

export const GotBack = () => {
  const router = useRouter()
  return (
    <div className=" inline-block">
      <div
        onClick={(e) => {
          e.preventDefault()
          router.back()
        }}
        className="flex items-center py-4 cursor-pointer"
      >
        <GoArrowLeft className="w-5 h-5 " />
        Voltar
      </div>
    </div>
  )
}
