import { InsertUserComponent } from '@/components/user/insert/InsertUserComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Insert user',
  },
}

export default function InsertUser() {
  return (
    <div className="flex justify-center items-center h-screen mt-[-80px]">
      <InsertUserComponent />
    </div>
  )
}
